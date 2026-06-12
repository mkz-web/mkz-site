import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
