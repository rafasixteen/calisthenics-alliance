import { describe, expect, it } from "vitest";
import { formatTime } from "./format";

describe("formatTime", () => {
	it("formats times under one minute", () => {
		expect(formatTime(58.2)).toBe("58.2''");
	});

	it("omits decimals for whole seconds under one minute", () => {
		expect(formatTime(59)).toBe("59''");
	});

	it("pads seconds below 10", () => {
		expect(formatTime(125.4)).toBe("2'05.4''");
	});

	it("omits decimals for whole minutes", () => {
		expect(formatTime(305)).toBe("5'05''");
	});

	it("formats double-digit minutes", () => {
		expect(formatTime(660)).toBe("11'00''");
	});

	it("preserves decimal precision", () => {
		expect(formatTime(454.2)).toBe("7'34.2''");
	});

	it("formats long durations", () => {
		expect(formatTime(1053)).toBe("17'33''");
	});
});
