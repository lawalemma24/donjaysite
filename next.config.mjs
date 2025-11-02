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
    ignoreDuringBuilds: true, // skip ESLint errors during build
  },
  turbopack: {
    root: "./", // fix workspace root warning
  },
  typedRoutes: true,
};

export default nextConfig;
