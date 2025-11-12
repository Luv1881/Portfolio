import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src"],
  },
  experimental: {
    typedRoutes: false,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  poweredByHeader: false,
};

export default withMDX(nextConfig);
