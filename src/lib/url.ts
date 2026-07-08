/**
 * Returns the application's configured base path.
 *
 * In development, an empty string is always returned so URLs resolve
 * correctly when running locally. In production, the base path is read
 * from the `NEXT_PUBLIC_BASE_PATH` environment variable.
 */
export function getBasePath() {
	if (process.env.NODE_ENV === "production") {
		return process.env.NEXT_PUBLIC_BASE_PATH || "";
	}

	return "";
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
