import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { getBasePath } from "@/lib/url";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: "export",
	images: {
		unoptimized: true,
	},
	basePath: getBasePath(),
	assetPrefix: getBasePath(),
};

export default withNextIntl(nextConfig);
