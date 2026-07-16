import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { useLogin } from "@/features/auth/api/use-login";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";
import { useTheme } from "@/hooks/use-theme";
import { LoginPage } from "./login";

const mockNavigate = vi.fn();
vi.mock("@tanstack/react-router", async (importOriginal) => {
	const actual =
		await importOriginal<typeof import("@tanstack/react-router")>();
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

const mockMutate = vi.fn();
vi.mock("@/features/auth/api/use-login", () => ({
	useLogin: vi.fn(),
}));

describe("LoginPage Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
		useAuthStore.setState({
			accessToken: null,
			refreshToken: null,
			user: null,
			isAuthenticated: false,
		});
		useTheme.setState({ theme: "light" });
		vi.mocked(useLogin).mockReturnValue({
			mutate: mockMutate,
			isPending: false,
			error: null,
			isError: false,
		} as any);
	});

	describe("Renderização e Estados Iniciais", () => {
		it("deve renderizar o título da marca, inputs e o botão de login", async () => {
			const screen = await render(<LoginPage />);

			await expect
				.element(screen.getByText("Voltiq", { exact: true }))
				.toBeVisible();
			await expect.element(screen.getByTestId("email-input")).toBeVisible();
			await expect.element(screen.getByTestId("password-input")).toBeVisible();
			await expect.element(screen.getByTestId("submit-button")).toBeVisible();
		});

		it("deve iniciar com os campos vazios e tipo de senha oculto", async () => {
			const screen = await render(<LoginPage />);
			const emailInput = screen.getByTestId("email-input");
			const passwordInput = screen.getByTestId("password-input");

			await expect.element(emailInput).toHaveValue("");
			await expect.element(passwordInput).toHaveValue("");
			await expect.element(passwordInput).toHaveAttribute("type", "password");
		});

		it("deve redirecionar para a home se o usuário já estiver autenticado", async () => {
			useAuthStore.setState({ isAuthenticated: true });

			await render(<LoginPage />);

			await vi.waitFor(() => {
				expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
			});
		});
	});

	describe("Interações e Comportamento do Formulário", () => {
		it("deve alternar a visibilidade da senha ao clicar no botão de exibir/ocultar senha", async () => {
			const screen = await render(<LoginPage />);
			const passwordInput = screen.getByTestId("password-input");
			const toggleButton = screen.getByTestId("password-toggle");

			await expect.element(passwordInput).toHaveAttribute("type", "password");

			await userEvent.click(toggleButton);
			await expect.element(passwordInput).toHaveAttribute("type", "text");

			await userEvent.click(toggleButton);
			await expect.element(passwordInput).toHaveAttribute("type", "password");
		});

		it("deve alternar o tema do sistema ao clicar no botão de tema", async () => {
			const screen = await render(<LoginPage />);
			const themeButton = screen.getByTestId("theme-toggle");

			const initialTheme = localStorage.getItem("voltiq-theme") || "light";
			const expectedNextTheme = initialTheme === "light" ? "dark" : "light";

			await userEvent.click(themeButton);

			expect(localStorage.getItem("voltiq-theme")).toBe(expectedNextTheme);
		});

		it("deve chamar a mutação de login com credenciais válidas ao submeter o formulário", async () => {
			const screen = await render(<LoginPage />);
			const emailInput = screen.getByTestId("email-input");
			const passwordInput = screen.getByTestId("password-input");
			const submitButton = screen.getByTestId("submit-button");

			await userEvent.fill(emailInput, "user@voltiq.com.br");
			await userEvent.fill(passwordInput, "senhaSegura123");

			await userEvent.click(submitButton);

			await vi.waitFor(() => {
				expect(mockMutate).toHaveBeenCalledWith({
					email: "user@voltiq.com.br",
					password: "senhaSegura123",
				});
			});
		});
	});

	describe("Validações do Formulário", () => {
		it("deve exibir mensagens de erro obrigatórias se submeter o formulário vazio", async () => {
			const screen = await render(<LoginPage />);
			const submitButton = screen.getByTestId("submit-button");

			await userEvent.click(submitButton);

			await expect.element(screen.getByTestId("email-error")).toBeVisible();
			await expect.element(screen.getByTestId("password-error")).toBeVisible();
			expect(mockMutate).not.toHaveBeenCalled();
		});

		it("deve exibir mensagem de erro para formato de e-mail inválido", async () => {
			const screen = await render(<LoginPage />);
			const emailInput = screen.getByTestId("email-input");
			const passwordInput = screen.getByTestId("password-input");
			const submitButton = screen.getByTestId("submit-button");

			await userEvent.fill(emailInput, "email-invalido");
			await userEvent.fill(passwordInput, "123456");
			await userEvent.click(submitButton);

			await expect.element(screen.getByTestId("email-error")).toBeVisible();
			expect(mockMutate).not.toHaveBeenCalled();
		});

		it("deve exibir mensagem de erro para senha com menos de 6 caracteres", async () => {
			const screen = await render(<LoginPage />);
			const emailInput = screen.getByTestId("email-input");
			const passwordInput = screen.getByTestId("password-input");
			const submitButton = screen.getByTestId("submit-button");

			await userEvent.fill(emailInput, "user@voltiq.com.br");
			await userEvent.fill(passwordInput, "123");
			await userEvent.click(submitButton);

			await expect.element(screen.getByTestId("password-error")).toBeVisible();
			expect(mockMutate).not.toHaveBeenCalled();
		});
	});

	describe("Estados de Carregamento e Erros da API", () => {
		it("deve exibir indicador de carregamento e desabilitar o botão durante a requisição", async () => {
			vi.mocked(useLogin).mockReturnValue({
				mutate: mockMutate,
				isPending: true,
				error: null,
				isError: false,
			} as any);

			const screen = await render(<LoginPage />);
			const submitButton = screen.getByTestId("submit-button");

			await expect.element(submitButton).toBeVisible();
			await expect.element(submitButton).toBeDisabled();
		});

		it("deve exibir mensagem de erro retornada pela API caso a autenticação falhe", async () => {
			const errorMessage = "E-mail ou senha incorretos.";
			vi.mocked(useLogin).mockReturnValue({
				mutate: mockMutate,
				isPending: false,
				error: new Error(errorMessage),
				isError: true,
			} as any);

			const screen = await render(<LoginPage />);

			await expect.element(screen.getByTestId("api-error")).toBeVisible();
			await expect
				.element(screen.getByTestId("api-error"))
				.toHaveTextContent(errorMessage);
		});
	});
});
