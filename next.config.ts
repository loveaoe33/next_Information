import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.imgur.com'],  // 允许从 Imgur 加载图片
  },
};

export default nextConfig;
