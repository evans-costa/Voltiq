import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserPayload } from "../types";

interface AuthState {
	accessToken: string | null;
	isAuthenticated: boolean;
	login: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
	refreshToken: string | null;
	user: UserPayload | null;
}

function decodeJwt(token: string): UserPayload | null {
	try {
		const payload = token.split(".")[1];
		if (!payload) {
			return null;
		}

		const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
		const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
		const raw = JSON.parse(new TextDecoder().decode(bytes));

		return {
			id: raw.sub ?? "",
			name: raw.unique_name ?? "",
			email: raw.email ?? raw.unique_name ?? "",
			role:
				raw["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
				raw.role ??
				"",
			exp: raw.exp ?? 0,
		};
	} catch {
		return null;
	}
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			user: null,
			isAuthenticated: false,
			login: (accessToken, refreshToken) => {
				const user = decodeJwt(accessToken);
				if (!user) {
					throw new Error("Token de acesso inválido ou malformatado.");
				}
				set({
					accessToken,
					refreshToken,
					user,
					isAuthenticated: true,
				});
			},
			logout: () => {
				set({
					accessToken: null,
					refreshToken: null,
					user: null,
					isAuthenticated: false,
				});
			},
		}),
		{
			name: "voltiq-auth",
		}
	)
);

if (typeof window !== "undefined") {
	window.addEventListener("auth-logout", () => {
		useAuthStore.getState().logout();
	});
}
