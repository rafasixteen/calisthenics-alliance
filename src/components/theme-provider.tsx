"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	// This is a workaround for a known issue with next-themes.
	// https://github.com/shadcn-ui/ui/issues/10200
	// React 19 / Next 16 fix: suppress the <script> tag warning by
	// telling next-themes to use type="application/json" instead of
	// type="text/javascript", which React won't try to execute
	const scriptProps = typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			{...props}
			scriptProps={scriptProps}>
			{children}
		</NextThemesProvider>
	);
}
