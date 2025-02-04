import { describe, expect, test } from "@jest/globals";
import { API_CONFIG } from "../config";

describe("API_CONFIG", () => {
	test("should have required API configuration properties", () => {
		expect(API_CONFIG).toBeDefined();
		expect(typeof API_CONFIG).toBe("object");
	});

	test("should have valid API configuration values", () => {
		expect(Object.keys(API_CONFIG)).not.toHaveLength(0);
		expect(Object.values(API_CONFIG).every((value) => typeof value === "string")).toBe(true);
	});

	test("should not contain null or undefined values", () => {
		Object.values(API_CONFIG).forEach((value) => {
			expect(value).not.toBeNull();
			expect(value).not.toBeUndefined();
		});
	});

	test("should have immutable properties", () => {
		const configCopy = { ...API_CONFIG };
		expect(() => {
			(API_CONFIG as any).newProperty = "test";
		}).toThrow();
		expect(API_CONFIG).toEqual(configCopy);
	});
});
