import { beforeEach, describe, expect, it } from "vitest";
import { useTheme } from "./use-theme";

describe("useTheme Hook", () => {
	beforeEach(() => {
		localStorage.clear();
		useTheme.getState().setTheme("light");
	});

	it("deve iniciar com o tema padrão light", () => {
		const state = useTheme.getState();
		expect(state.theme).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("deve alternar o tema e aplicar a classe CSS no documentElement", () => {
		// Alterna para dark
		useTheme.getState().toggleTheme();
		expect(useTheme.getState().theme).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(localStorage.getItem("voltiq-theme")).toBe("dark");

		// Alterna de volta para light
		useTheme.getState().toggleTheme();
		expect(useTheme.getState().theme).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(localStorage.getItem("voltiq-theme")).toBe("light");
	});

	it("deve definir o tema diretamente", () => {
		useTheme.getState().setTheme("dark");
		expect(useTheme.getState().theme).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);

		useTheme.getState().setTheme("light");
		expect(useTheme.getState().theme).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});
});
