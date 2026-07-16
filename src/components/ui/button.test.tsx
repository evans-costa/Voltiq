import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Button } from "./button";

describe("Button Component", () => {
	it("deve renderizar o botão com o texto correto", async () => {
		const screen = await render(<Button data-testid="btn">Enviar</Button>);
		const button = screen.getByTestId("btn");

		await expect.element(button).toBeVisible();
		await expect.element(button).toHaveTextContent("Enviar");
	});

	it("deve propagar cliques corretamente", async () => {
		const handleClick = vi.fn();
		const screen = await render(
			<Button data-testid="btn" onClick={handleClick}>
				Clique Aqui
			</Button>
		);
		const button = screen.getByTestId("btn");

		await userEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("deve ficar desabilitado e não propagar cliques", async () => {
		const handleClick = vi.fn();
		const screen = await render(
			<Button data-testid="btn" disabled onClick={handleClick}>
				Não Clicar
			</Button>
		);
		const button = screen.getByTestId("btn");

		await expect.element(button).toBeDisabled();
		(button.element() as HTMLElement).click();
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("deve possuir atributos corretos de variante e tamanho", async () => {
		const screen = await render(
			<Button data-testid="btn" size="sm" variant="destructive">
				Destrutivo
			</Button>
		);
		const button = screen.getByTestId("btn");

		await expect.element(button).toHaveAttribute("data-variant", "destructive");
		await expect.element(button).toHaveAttribute("data-size", "sm");
	});
});
