import {
	createRootRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeToggle } from "../components/theme-toggle";
import appCss from "../styles.css?url";

const RootLayout = () => {
	const location = useLocation();
	const isPublicPage =
		location.pathname === "/" || location.pathname === "/login";

	if (isPublicPage) {
		return (
			<>
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	}

	return (
		<>
			<div className="flex items-center justify-between p-2">
				<div className="flex gap-2">
					<Link className="[&.active]:font-bold" to="/">
						Home
					</Link>
				</div>
				<ThemeToggle />
			</div>
			<hr className="border-border" />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
};

export const Route = createRootRoute({
	head: () => ({
		meta: [],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootLayout,
});
