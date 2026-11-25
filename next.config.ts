import type { NextConfig } from "next";

// A static site: `next build` writes plain HTML to out/, which Netlify serves (netlify.toml).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
};

export default nextConfig;
