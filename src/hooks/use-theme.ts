import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
	setTheme: (theme: Theme) => void;
	theme: Theme;
	toggleTheme: () => void;
}

export const useTheme = create<ThemeState>((set) => {
	const initialTheme =
		(localStorage.getItem("voltiq-theme") as Theme) || "light";

	document.documentElement.classList.toggle("dark", initialTheme === "dark");

	return {
		theme: initialTheme,
		toggleTheme: () =>
			set((state) => {
				const nextTheme = state.theme === "light" ? "dark" : "light";
				localStorage.setItem("voltiq-theme", nextTheme);
				document.documentElement.classList.toggle("dark", nextTheme === "dark");
				return { theme: nextTheme };
			}),
		setTheme: (theme) => {
			localStorage.setItem("voltiq-theme", theme);
			document.documentElement.classList.toggle("dark", theme === "dark");
			set({ theme });
		},
	};
});
