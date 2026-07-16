import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bolt, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/api/use-login";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

const loginSchema = z.object({
	email: z
		.string()
		.min(1, "O e-mail é obrigatório")
		.email("Insira um endereço de e-mail válido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
	const navigate = useNavigate();
	const { mutate: loginMutate, isPending, error, isError } = useLogin();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: "/" });
		}
	}, [isAuthenticated, navigate]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: LoginFormData) => {
		loginMutate(data);
	};

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background bg-grid-pattern px-4 py-12">
			{/* Floating Theme Toggle */}
			<div className="absolute top-4 right-4 z-50">
				<ThemeToggle />
			</div>

			{/* Efeito de brilho de fundo (Electric Volt & Copper Glow) */}
			<div className="absolute top-0 -left-4 size-96 rounded-full bg-primary/20 opacity-40 blur-3xl filter" />
			<div className="absolute -right-4 bottom-0 size-96 rounded-full bg-secondary/15 opacity-30 blur-3xl filter" />

			<div className="relative w-full max-w-md animate-fade-in">
				{/* Card Principal de Login com borda sutil */}
				<Card className="relative overflow-hidden border border-border bg-card/60 shadow-2xl backdrop-blur-md">
					{/* Linha "Circuit" no topo do Card - Marca do Voltiq */}
					<div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-primary to-secondary" />

					<CardHeader className="flex flex-col items-center space-y-2 pt-8 text-center">
						<div className="flex size-12 items-center justify-center rounded-lg bg-accent text-primary shadow-lg shadow-primary/20">
							<Bolt className="size-6" />
						</div>
						<CardTitle className="font-bold font-heading text-3xl text-foreground tracking-tight">
							Voltiq
						</CardTitle>
						<CardDescription className="text-muted-foreground text-sm">
							Entre com suas credenciais para gerenciar seus orçamentos
						</CardDescription>
					</CardHeader>

					<CardContent className="pb-8">
						{/* Mensagem de Erro da API */}
						{isError && (
							<div
								className="mb-6 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-destructive text-sm"
								data-testid="api-error"
							>
								{error instanceof Error
									? error.message
									: "Falha na autenticação. Verifique seu e-mail e senha."}
							</div>
						)}

						{/* Formulário */}
						<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-2">
								<Label
									className="font-semibold text-muted-foreground text-xs uppercase tracking-wider"
									htmlFor="email"
								>
									E-mail
								</Label>
								<Input
									autoComplete="email"
									className="bg-background/50 dark:bg-background/20"
									data-testid="email-input"
									id="email"
									placeholder="exemplo@voltiq.com.br"
									type="text"
									{...register("email")}
								/>
								{errors.email && (
									<p
										className="text-destructive text-xs"
										data-testid="email-error"
									>
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label
										className="font-semibold text-muted-foreground text-xs uppercase tracking-wider"
										htmlFor="password"
									>
										Senha
									</Label>
								</div>
								<div className="relative">
									<Input
										autoComplete="current-password"
										className="bg-background/50 pr-10 dark:bg-background/20"
										data-testid="password-input"
										id="password"
										placeholder="••••••••"
										type={showPassword ? "text" : "password"}
										{...register("password")}
									/>
									<button
										className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground outline-none hover:text-foreground"
										data-testid="password-toggle"
										onClick={() => setShowPassword(!showPassword)}
										type="button"
									>
										{showPassword ? (
											<EyeOff className="size-4" />
										) : (
											<Eye className="size-4" />
										)}
									</button>
								</div>
								{errors.password && (
									<p
										className="text-destructive text-xs"
										data-testid="password-error"
									>
										{errors.password.message}
									</p>
								)}
							</div>

							<Button
								className="h-10 w-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/35 active:translate-y-px"
								data-testid="submit-button"
								disabled={isPending}
								type="submit"
							>
								{isPending ? (
									<>
										<Loader2 className="mr-2 size-4 animate-spin" />
										Autenticando...
									</>
								) : (
									"Entrar no Painel"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>

				<p className="mt-8 text-center text-muted-foreground text-xs">
					Voltiq v1.0.0 — Todos os direitos reservados.
				</p>
			</div>
		</div>
	);
}
