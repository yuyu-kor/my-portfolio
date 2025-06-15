/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "secure.notion-static.com",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com", // ✅ 이 줄 추가
    ],
  },
};

export default nextConfig;
