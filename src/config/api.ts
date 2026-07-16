import axios from "axios";

const getAccessToken = (): string | null => {
	try {
		const raw = localStorage.getItem("voltiq-auth");
		return (raw && JSON.parse(raw).state?.accessToken) ?? null;
	} catch {
		return null;
	}
};

export const api = axios.create({
	baseURL:
		(import.meta.env.VITE_API_URL as string) || "https://localhost:7085/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

let isRefreshing = false;
let pendingQueue: Array<{
	resolve: (token: string) => void;
	reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
	for (const { resolve, reject } of pendingQueue) {
		if (error) {
			reject(error);
		} else {
			resolve(token as string);
		}
	}
	pendingQueue = [];
};

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		const shouldRefresh =
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes("/refresh") &&
			!originalRequest.url?.includes("/login");

		if (!shouldRefresh) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				pendingQueue.push({ resolve, reject });
			}).then((token) => {
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return api(originalRequest);
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			const raw = localStorage.getItem("voltiq-auth");
			const parsed = raw ? JSON.parse(raw) : null;
			const refreshToken = parsed?.state?.refreshToken;

			if (!refreshToken) {
				throw new Error("Refresh token não disponível.");
			}

			const { data } = await axios.post<{
				accessToken: string;
				refreshToken: string;
			}>(`${api.defaults.baseURL}/refresh`, { refreshToken });

			parsed.state.accessToken = data.accessToken;
			parsed.state.refreshToken = data.refreshToken;
			parsed.state.isAuthenticated = true;
			localStorage.setItem("voltiq-auth", JSON.stringify(parsed));

			processQueue(null, data.accessToken);

			originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
			return api(originalRequest);
		} catch (refreshError) {
			processQueue(refreshError, null);
			localStorage.removeItem("voltiq-auth");
			window.dispatchEvent(new Event("auth-logout"));
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	}
);
