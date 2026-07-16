import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthStore } from "./use-auth-store";

// Mock JWT Token containing:
// {
//   "sub": "user-123",
//   "unique_name": "John Doe",
//   "email": "john@voltiq.com.br",
//   "role": "Admin",
//   "exp": 1800000000
// }
const MOCK_VALID_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsInVuaXF1ZV9uYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5Adm9sdGlxLmNvbS5iciIsInJvbGUiOiJBZG1pbiIsImV4cCI6MTgwMDAwMDAwMH0.signature";

const MOCK_REFRESH_TOKEN = "mock-refresh-token";

describe("useAuthStore", () => {
	beforeEach(() => {
		// Reset the Zustand store before each test
		useAuthStore.setState({
			accessToken: null,
			refreshToken: null,
			user: null,
			isAuthenticated: false,
		});
		localStorage.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("deve iniciar com o estado padrão (Happy Path - Estado Inicial)", () => {
		const state = useAuthStore.getState();
		expect(state.accessToken).toBeNull();
		expect(state.refreshToken).toBeNull();
		expect(state.user).toBeNull();
		expect(state.isAuthenticated).toBe(false);
	});

	it("deve realizar login com token válido e decodificar os dados do usuário", () => {
		useAuthStore.getState().login(MOCK_VALID_TOKEN, MOCK_REFRESH_TOKEN);

		const state = useAuthStore.getState();
		expect(state.accessToken).toBe(MOCK_VALID_TOKEN);
		expect(state.refreshToken).toBe(MOCK_REFRESH_TOKEN);
		expect(state.isAuthenticated).toBe(true);
		expect(state.user).toEqual({
			id: "user-123",
			name: "John Doe",
			email: "john@voltiq.com.br",
			role: "Admin",
			exp: 1_800_000_000,
		});
	});

	it("deve falhar ao realizar login com token malformatado e não autenticar o usuário", () => {
		const invalidToken = "invalid.token.here";

		expect(() => {
			useAuthStore.getState().login(invalidToken, MOCK_REFRESH_TOKEN);
		}).toThrow("Token de acesso inválido ou malformatado.");

		const state = useAuthStore.getState();
		expect(state.accessToken).toBeNull();
		expect(state.refreshToken).toBeNull();
		expect(state.isAuthenticated).toBe(false);
		expect(state.user).toBeNull();
	});

	it("deve limpar o estado ao realizar logout", () => {
		// Realiza login primeiro
		useAuthStore.getState().login(MOCK_VALID_TOKEN, MOCK_REFRESH_TOKEN);
		expect(useAuthStore.getState().isAuthenticated).toBe(true);

		// Realiza logout
		useAuthStore.getState().logout();

		const state = useAuthStore.getState();
		expect(state.accessToken).toBeNull();
		expect(state.refreshToken).toBeNull();
		expect(state.user).toBeNull();
		expect(state.isAuthenticated).toBe(false);
	});

	it("deve realizar logout automaticamente ao disparar o evento 'auth-logout' na window ", () => {
		// Realiza login primeiro
		useAuthStore.getState().login(MOCK_VALID_TOKEN, MOCK_REFRESH_TOKEN);
		expect(useAuthStore.getState().isAuthenticated).toBe(true);

		// Dispara o evento
		window.dispatchEvent(new Event("auth-logout"));

		const state = useAuthStore.getState();
		expect(state.accessToken).toBeNull();
		expect(state.refreshToken).toBeNull();
		expect(state.user).toBeNull();
		expect(state.isAuthenticated).toBe(false);
	});
});
