/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.ts$/i,
      issuer: /\.[jt]sx?$/,
      use: [defaultLoaders.babel],
    });

    return config;
  },
};

module.exports = nextConfig;
