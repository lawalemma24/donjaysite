/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatar.iran.liara.run",
      "example.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    root: "./",
  },
  typedRoutes: true,
};

export default nextConfig;
