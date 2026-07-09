import { afterEach, describe, expect, it } from "vitest";
import { getBasePath, url } from "./url";

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

afterEach(() => {
	process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
});

describe("getBasePath", () => {
	it.each([
		[undefined, ""],
		["", ""],
		["/app", "/app"],
		["/app/", "/app"],
		[" /app/ ", "/app"],
	])("returns %s as %s", (envValue, expected) => {
		if (envValue === undefined) {
			delete process.env.NEXT_PUBLIC_BASE_PATH;
		} else {
			process.env.NEXT_PUBLIC_BASE_PATH = envValue;
		}

		expect(getBasePath()).toBe(expected);
	});
});

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
