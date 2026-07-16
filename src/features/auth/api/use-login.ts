import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useAuthStore } from "../hooks/use-auth-store";
import type { LoginRequest, LoginResponse } from "../types";

export const useLogin = () => {
	const login = useAuthStore((state) => state.login);

	return useMutation<LoginResponse, Error, LoginRequest>({
		mutationFn: async (credentials) => {
			const response = await api.post<LoginResponse>("/login", credentials);
			return response.data;
		},
		onSuccess: (data) => {
			login(data.accessToken, data.refreshToken);
		},
	});
};
