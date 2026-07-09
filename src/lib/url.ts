/**
 * Returns the configured base path for the application.
 *
 * The base path is read from the NEXT_PUBLIC_BASE_PATH environment variable.
 * If the variable is not set or is empty, an empty string is returned.
 * Any trailing slashes are removed to ensure the value can be safely
 * concatenate with application routes and asset paths.
 */
export function getBasePath() {
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

	if (!basePath) {
		return "";
	}

	return basePath.replace(/\/+$/, "");
}

/**
 * Builds an application-relative URL by combining the base path with the
 * provided path. Leading and trailing slashes are normalized to ensure
 * the resulting URL contains exactly one separator.
 *
 * @param path - The application-relative path.
 * @param basePath - Optional base path to prepend. Defaults to the configured application base path.
 * @returns The normalized application URL.
 */
export function url(path: string, basePath: string = getBasePath()) {
	basePath = basePath.replace(/\/+$/, "");

	if (!path) {
		return basePath || "/";
	}

	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${basePath}${normalizedPath}`;
}
