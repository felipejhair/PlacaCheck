/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/animalitos",
        destination: "/bebe",
      },
      {
        source: "/baby",
        destination: "/bebe",
      },
    ];
  },
};

export default nextConfig;
