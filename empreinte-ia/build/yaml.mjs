/**
 * yaml.mjs : mini analyseur YAML et chargeur de jeu de donnees.
 *
 * Execution   : importe par build/build.mjs et src/engine.test.js
 * Runtime     : Node >= 14 (aucune API au dela de fs/path)
 * Dependances : aucune
 *
 * Couvre volontairement un sous ensemble de YAML : mappings imbriques,
 * listes de scalaires, listes d'objets, listes inline, scalaires replies.
 * Les fichiers de data/ sont ecrits pour rester dans ce sous ensemble.
 * Toute construction non geree leve une erreur au build plutot que de
 * produire silencieusement un jeu de donnees faux.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const KEY = /^([A-Za-z0-9_.-]+)\s*:\s*([\s\S]*)$/;

function stripComment(value) {
  let out = '';
  let quote = null;
  for (let k = 0; k < value.length; k++) {
    const c = value[k];
    if (quote) {
      out += c;
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      out += c;
      continue;
    }
    if (c === '#' && (k === 0 || /\s/.test(value[k - 1]))) break;
    out += c;
  }
  return out.trim();
}

function parseScalar(raw) {
  const value = raw.trim();
  if (value === '' || value === 'null' || value === '~') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (inner === '') return [];
    return inner.split(',').map((part) => parseScalar(part));
  }
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(value)) return Number(value);
  return value;
}

export function parseYaml(source, label = 'yaml') {
  const lines = source.split(/\r?\n/);
  let cursor = 0;

  function peek() {
    while (cursor < lines.length) {
      const line = lines[cursor];
      if (line.trim() === '' || /^\s*#/.test(line)) {
        cursor++;
        continue;
      }
      return { indent: line.length - line.trimStart().length, text: line.trim(), at: cursor };
    }
    return null;
  }

  function readFolded(parentIndent, literal) {
    const parts = [];
    while (cursor < lines.length) {
      const line = lines[cursor];
      if (line.trim() === '') {
        cursor++;
        parts.push('');
        continue;
      }
      const indent = line.length - line.trimStart().length;
      if (indent <= parentIndent) break;
      parts.push(line.trim());
      cursor++;
    }
    while (parts.length && parts[parts.length - 1] === '') parts.pop();
    return literal ? parts.join('\n') : parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  function parseValueAfterKey(rest, indent) {
    if (rest === '>' || rest === '|') {
      cursor++;
      return readFolded(indent, rest === '|');
    }
    cursor++;
    if (rest !== '') return parseScalar(stripComment(rest));
    const next = peek();
    if (next && next.indent > indent) return parseBlock(next.indent);
    return null;
  }

  function parseMap(indent) {
    const obj = {};
    for (;;) {
      const token = peek();
      if (!token || token.indent < indent) break;
      if (token.indent > indent) {
        throw new Error(`${label} ligne ${token.at + 1} : indentation inattendue`);
      }
      if (token.text.startsWith('- ')) break;
      const match = token.text.match(KEY);
      if (!match) throw new Error(`${label} ligne ${token.at + 1} : cle illisible "${token.text}"`);
      obj[match[1]] = parseValueAfterKey(match[2].trim(), indent);
    }
    return obj;
  }

  function parseList(indent) {
    const arr = [];
    for (;;) {
      const token = peek();
      if (!token || token.indent < indent || !token.text.startsWith('-')) break;
      const content = token.text.slice(1).trim();
      cursor++;
      if (content === '') {
        const next = peek();
        arr.push(next && next.indent > indent ? parseBlock(next.indent) : null);
        continue;
      }
      const match = content.match(KEY);
      if (match) {
        const obj = {};
        const childIndent = indent + 2;
        const head = match[2].trim();
        obj[match[1]] =
          head === '>' || head === '|'
            ? readFolded(indent + 1, head === '|')
            : parseScalar(stripComment(head));
        for (;;) {
          const next = peek();
          if (!next || next.indent < childIndent || next.text.startsWith('- ')) break;
          const child = next.text.match(KEY);
          if (!child) throw new Error(`${label} ligne ${next.at + 1} : cle illisible dans une liste`);
          obj[child[1]] = parseValueAfterKey(child[2].trim(), next.indent);
        }
        arr.push(obj);
        continue;
      }
      arr.push(parseScalar(stripComment(content)));
    }
    return arr;
  }

  function parseBlock(indent) {
    const token = peek();
    if (!token || token.indent < indent) return null;
    return token.text.startsWith('-') ? parseList(token.indent) : parseMap(token.indent);
  }

  const first = peek();
  if (!first) return {};
  return parseBlock(first.indent);
}

const FILES = {
  models: 'models.yaml',
  grid: 'grid.yaml',
  embodied: 'embodied.yaml',
  water: 'water.yaml',
  equivalences: 'equivalences.yaml'
};

/**
 * Charge les cinq fichiers de data/ et verifie leur coherence.
 * Echoue au build si les versions divergent : une page qui affiche
 * "jeu de donnees v0.1.0" alors qu'un fichier est en v0.2.0 est un mensonge.
 */
export function loadDataset(dataDir) {
  const dataset = {};
  for (const [key, file] of Object.entries(FILES)) {
    dataset[key] = parseYaml(readFileSync(join(dataDir, file), 'utf8'), file);
  }

  const versions = new Set(Object.values(dataset).map((d) => d.version));
  if (versions.size !== 1) {
    throw new Error(`Versions divergentes entre les fichiers de data/ : ${[...versions].join(', ')}`);
  }
  const dates = new Set(Object.values(dataset).map((d) => d.updated));
  if (dates.size !== 1) {
    throw new Error(`Dates de mise a jour divergentes dans data/ : ${[...dates].join(', ')}`);
  }

  dataset.version = dataset.models.version;
  dataset.updated = dataset.models.updated;
  return dataset;
}
