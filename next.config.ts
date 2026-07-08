import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

console.log("NEXT_PUBLIC_BASE_PATH", process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: "export",
	images: {
		unoptimized: true,
	},
	basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
	assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default withNextIntl(nextConfig);
