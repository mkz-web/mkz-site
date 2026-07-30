import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    // Deux root layouts (route groups « (fr) » et « (en) ») privent Next d'un
    // layout unique pour composer la 404 globale : sans ce drapeau, out/404.html
    // retombe sur la page d'erreur par défaut de Next, sans marque ni attribut
    // lang. Voir src/app/global-not-found.tsx.
    globalNotFound: true,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
