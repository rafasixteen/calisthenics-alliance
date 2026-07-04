import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

console.log("isGitHubPages", isGitHubPages);

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	basePath: isGitHubPages ? "/calisthenics-alliance" : "",
	assetPrefix: isGitHubPages ? "/calisthenics-alliance/" : undefined,
};

export default nextConfig;
