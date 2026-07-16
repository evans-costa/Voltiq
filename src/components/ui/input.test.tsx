import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Input } from "./input";

describe("Input Component", () => {
	it("deve renderizar o input com atributos e placeholder corretos", async () => {
		const screen = await render(
			<Input data-testid="input" placeholder="Digite seu e-mail" type="email" />
		);
		const input = screen.getByTestId("input");

		await expect.element(input).toBeVisible();
		await expect
			.element(input)
			.toHaveAttribute("placeholder", "Digite seu e-mail");
		await expect.element(input).toHaveAttribute("type", "email");
	});

	it("deve gerenciar alteração de valor ao digitar", async () => {
		const screen = await render(<Input data-testid="input" />);
		const input = screen.getByTestId("input");

		await userEvent.fill(input, "voltiq@voltiq.com");
		await expect.element(input).toHaveValue("voltiq@voltiq.com");
	});

	it("deve disparar eventos de focus e blur", async () => {
		const handleFocus = vi.fn();
		const handleBlur = vi.fn();

		const screen = await render(
			<Input data-testid="input" onBlur={handleBlur} onFocus={handleFocus} />
		);
		const input = screen.getByTestId("input");

		input.element().focus();
		expect(handleFocus).toHaveBeenCalledTimes(1);

		input.element().blur();
		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	it("deve ficar desabilitado e impedir digitação", async () => {
		const screen = await render(<Input data-testid="input" disabled />);
		const input = screen.getByTestId("input");

		await expect.element(input).toBeDisabled();
	});
});
