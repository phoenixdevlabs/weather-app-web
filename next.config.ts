import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async headers() {
        return [
            {
                source: "/api/:path*", // Match all API routes
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }, // Or "https://example.com"
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                ],
            },
        ];
    },
    reactCompiler: true,
};

export default nextConfig;
