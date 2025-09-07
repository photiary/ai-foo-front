/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    proxyTimeout: 300000,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // API Proxy 설정
      },
      {
        source: "/v1/chat",
        destination: "http://localhost:8080/v1/chat", // 채팅 API 프록시
      },
      {
        source: "/v1/food/:path*",
        destination: "http://localhost:8080/v1/food/:path*", // 음식 API 프록시
      },
      {
        source: "/v1/models",
        destination: "http://localhost:8080/v1/models", // 모델 API 프록시
      },
    ];
  },
};

export default nextConfig;
