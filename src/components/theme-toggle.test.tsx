import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle Component", () => {
	beforeEach(() => {
		localStorage.clear();
		useTheme.setState({ theme: "light" });
	});

	it("deve renderizar o botão de alternar tema", async () => {
		const screen = await render(<ThemeToggle />);
		const button = screen.getByTestId("theme-toggle");

		await expect.element(button).toBeVisible();
		await expect.element(button).toHaveAttribute("aria-label", "Alternar tema");
	});

	it("deve alternar o tema entre light e dark ao clicar", async () => {
		const screen = await render(<ThemeToggle />);
		const button = screen.getByTestId("theme-toggle");

		expect(useTheme.getState().theme).toBe("light");

		await userEvent.click(button);
		expect(useTheme.getState().theme).toBe("dark");
		expect(localStorage.getItem("voltiq-theme")).toBe("dark");

		await userEvent.click(button);
		expect(useTheme.getState().theme).toBe("light");
		expect(localStorage.getItem("voltiq-theme")).toBe("light");
	});
});
