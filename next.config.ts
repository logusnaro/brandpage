import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/legal/allinmemo/terms",
        destination: "https://plaid-spade-e49.notion.site/ALLinMEMO-3e82d185844c8159b4b1e30bd21fbd2c",
        permanent: false,
      },
      {
        source: "/legal/allinmemo/privacy",
        destination: "https://plaid-spade-e49.notion.site/ALLinMEMO-3e82d185844c81ad8620e843316cc90a",
        permanent: false,
      },
      {
        source: "/legal/allinmemo/ai",
        destination: "https://plaid-spade-e49.notion.site/ALLinMEMO-AI-3e82d185844c8141897dfd5a509e9944",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
