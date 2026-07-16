import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	test: {
		reporters: ["html"],
		outputFile: "./tests/vitest-report/index.html",
		browser: {
			provider: playwright({
				launchOptions: {
					executablePath: "/usr/bin/chromium",
				},
			}),
			enabled: true,
			headless: true,
			instances: [{ browser: "chromium" }],
		},
	},
});
