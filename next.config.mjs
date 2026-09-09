/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "akosds.com" }],
        destination: "https://www.akosds.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
