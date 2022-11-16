/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // the code below fixes the error with using packages content in Nextjs
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
