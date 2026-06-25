/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://blog.artgourmet.cloud',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
