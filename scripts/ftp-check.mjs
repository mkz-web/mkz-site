import { Client } from "basic-ftp";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, posix } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const credentialsPath = resolve(projectRoot, ".ftp-credentials");

if (!existsSync(credentialsPath)) {
  console.error("❌ .ftp-credentials introuvable.");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(credentialsPath, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR = "/", FTP_SECURE = "false" } = env;

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error("❌ FTP_HOST, FTP_USER, FTP_PASSWORD sont requis dans .ftp-credentials");
  process.exit(1);
}

console.log(`→ Host:   ${FTP_HOST}`);
console.log(`→ User:   ${FTP_USER}`);
console.log(`→ Dir:    ${FTP_REMOTE_DIR}`);
console.log(`→ Mode:   ${FTP_SECURE === "true" ? "FTPS" : "FTP"}`);
console.log("");

const client = new Client(30_000);
client.ftp.verbose = false;

async function walk(dir, depth = 0, maxDepth = 3) {
  const items = await client.list(dir);
  let files = 0;
  let dirs = 0;
  let totalSize = 0;
  for (const item of items) {
    const full = posix.join(dir, item.name);
    const indent = "  ".repeat(depth);
    if (item.isDirectory) {
      dirs++;
      console.log(`${indent}📁 ${item.name}/`);
      if (depth < maxDepth) {
        const sub = await walk(full, depth + 1, maxDepth);
        files += sub.files;
        dirs += sub.dirs;
        totalSize += sub.totalSize;
      }
    } else if (item.isFile) {
      files++;
      totalSize += item.size;
      if (depth <= 1) {
        console.log(`${indent}📄 ${item.name} (${(item.size / 1024).toFixed(1)} KB)`);
      }
    }
  }
  return { files, dirs, totalSize };
}

try {
  console.log("→ Connexion…");
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === "true",
  });
  console.log("✅ Connecté.\n");

  console.log(`→ pwd = ${await client.pwd()}\n`);

  console.log(`→ Contenu de ${FTP_REMOTE_DIR} :\n`);
  const stats = await walk(FTP_REMOTE_DIR);

  console.log("");
  console.log("─────────────────────────────");
  console.log(`Total : ${stats.files} fichier(s), ${stats.dirs} dossier(s)`);
  console.log(`Taille : ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log("─────────────────────────────");
} catch (err) {
  console.error("\n❌ Erreur:", err.message);
  process.exitCode = 1;
} finally {
  client.close();
}
