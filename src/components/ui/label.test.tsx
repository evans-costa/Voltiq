import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { Label } from "./label";

describe("Label Component", () => {
	it("deve renderizar o label com o texto correto", async () => {
		const screen = await render(
			<Label data-testid="label">Nome Completo</Label>
		);
		const label = screen.getByTestId("label");

		await expect.element(label).toBeVisible();
		await expect.element(label).toHaveTextContent("Nome Completo");
	});

	it("deve possuir o atributo data-slot igual a label", async () => {
		const screen = await render(<Label data-testid="label">Senha</Label>);
		const label = screen.getByTestId("label");

		await expect.element(label).toHaveAttribute("data-slot", "label");
	});
});
