import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/qr-code.html",
        destination: "/qr-code",
      },
    ];
  },
};

export default nextConfig;
