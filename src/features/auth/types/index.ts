export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
}

export interface UserPayload {
	email: string;
	exp: number;
	id: string;
	name: string;
	role?: string;
}
