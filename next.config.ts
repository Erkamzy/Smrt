import type { NextConfig } from "next";

// Supabase Storage-ийн зураг (мэдээний зураг)
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mddic.gov.mn" },
      ...(supabaseHost
        ? [{ protocol: "https" as const, hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
        : []),
    ],
  },
  experimental: {
    // Мэдээний зураг (≤4MB) server action-оор хуулна
    serverActions: { bodySizeLimit: "5mb" },
  },
};

export default nextConfig;
