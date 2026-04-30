import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.top3dgs.com",
          },
        ],
        destination: "https://top3dgs.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
