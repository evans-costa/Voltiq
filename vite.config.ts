import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routeFileIgnorePattern:
				"((^|\\/)\\.[^\\/]+\\.(js|ts|tsx)$)|(\\.(test|spec)\\.(js|ts|tsx)$)",
		}),
		tailwindcss(),
		react(),
	],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
