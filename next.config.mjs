/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bwghxdlvuijbpsjjhnvx.supabase.co",
      },
    ],
  },
};

export default nextConfig;
