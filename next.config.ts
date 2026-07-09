import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { getBasePath } from "@/lib/url";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	// This fixes an issue in mobile with the 'Sheet' component not opening
	// when accessing the dev server from a different device on the same network.
	allowedDevOrigins: ["192.168.0.21"],
	reactCompiler: true,
	output: "export",
	images: {
		unoptimized: true,
	},
	basePath: getBasePath(),
	assetPrefix: getBasePath(),
};

export default withNextIntl(nextConfig);
