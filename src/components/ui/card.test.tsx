import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";

describe("Card Component", () => {
	it("deve renderizar a estrutura completa do card com os conteúdos correspondentes", async () => {
		const screen = await render(
			<Card data-testid="card">
				<CardHeader data-testid="card-header">
					<CardTitle data-testid="card-title">Título do Card</CardTitle>
					<CardDescription data-testid="card-description">
						Descrição do Card
					</CardDescription>
				</CardHeader>
				<CardContent data-testid="card-content">
					Conteúdo principal do Card
				</CardContent>
				<CardFooter data-testid="card-footer">Rodapé</CardFooter>
			</Card>
		);

		await expect.element(screen.getByTestId("card")).toBeVisible();
		await expect.element(screen.getByTestId("card-header")).toBeVisible();
		await expect
			.element(screen.getByTestId("card-title"))
			.toHaveTextContent("Título do Card");
		await expect
			.element(screen.getByTestId("card-description"))
			.toHaveTextContent("Descrição do Card");
		await expect
			.element(screen.getByTestId("card-content"))
			.toHaveTextContent("Conteúdo principal do Card");
		await expect
			.element(screen.getByTestId("card-footer"))
			.toHaveTextContent("Rodapé");
	});

	it("deve aplicar tamanho personalizado no card", async () => {
		const screen = await render(
			<Card data-testid="card" size="sm">
				<CardContent>Conteúdo</CardContent>
			</Card>
		);

		const card = screen.getByTestId("card");
		await expect.element(card).toHaveAttribute("data-size", "sm");
	});
});
