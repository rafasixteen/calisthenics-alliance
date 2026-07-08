import { describe, expect, it } from "vitest";
import { url } from "./url";

describe("url", () => {
	it.each([
		["", "/logo.svg", "/logo.svg"],
		["", "logo.svg", "/logo.svg"],
		["/app", "/logo.svg", "/app/logo.svg"],
		["/app", "logo.svg", "/app/logo.svg"],
		["/app/", "/logo.svg", "/app/logo.svg"],
		["/app/", "logo.svg", "/app/logo.svg"],
		["/app", "", "/app"],
		["", "", "/"],
	])("url(%s, %s)", (basePath, path, expected) => {
		expect(url(path, basePath)).toBe(expected);
	});
});
