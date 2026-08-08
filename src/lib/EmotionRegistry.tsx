"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Registre de styles Emotion pour l'App Router (pattern documenté par Next.js).
//
// POURQUOI il est indispensable ici. Sans registre, Emotion rend ses règles en
// <style data-emotion> INLINE, au milieu du corps du document, juste avant
// chaque élément stylé. Au montage, le client déplace tout dans le <head> et ne
// rend aucun de ces <style>. React hydrate donc un DOM qui contient des nœuds
// que son arbre ne produit pas, et lève « Hydration failed » (erreur React 418).
// Mesuré le 08/08/2026 sur l'accueil : 139 <style data-emotion> dans le <body>
// servi, 0 dans le <body> après hydratation, 139 dans le <head>.
//
// Le registre inverse l'ordre : les règles sérialisées pendant le rendu serveur
// sont collectées puis émises par useServerInsertedHTML, qui les place dans le
// <head> du HTML généré. Le corps ne contient plus un seul <style>, et les deux
// arbres coïncident.
//
// `cache.compat = true` est ce qui dit à Emotion de ne PLUS rendre ses <style>
// lui-même : sans ce drapeau, les styles seraient écrits deux fois, dans le
// head par le registre et dans le corps par Emotion, et le défaut resterait.
//
// La clé reste « css », valeur par défaut : elle préfixe les noms de classes
// (css-uh6uye). En changer renommerait toutes les classes sans rien apporter.
export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    const insertionOriginale = cache.insert;
    let inserees: string[] = [];
    cache.insert = (...args) => {
      const serialise = args[1];
      if (cache.inserted[serialise.name] === undefined) inserees.push(serialise.name);
      return insertionOriginale(...args);
    };
    const flush = () => {
      const precedentes = inserees;
      inserees = [];
      return precedentes;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const noms = flush();
    if (noms.length === 0) return null;
    let styles = "";
    for (const nom of noms) {
      const regle = cache.inserted[nom];
      if (typeof regle === "string") styles += regle;
    }
    return (
      <style
        data-emotion={`${cache.key} ${noms.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
