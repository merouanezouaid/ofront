/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/socket.io/:path*',
          destination: 'https://localhost:8000/socket.io/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;