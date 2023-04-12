/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false, //had to add this because nodejs was older to install sass
    includePaths: [path.join(__dirname, "styles")],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
