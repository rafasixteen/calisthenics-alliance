"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";

interface ThemeSwitcherProps {
	label?: string;
}

export function ThemeSwitcher({ label }: ThemeSwitcherProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch since next-themes only knows
	// the real theme after mounting on the client.
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <Button variant="ghost" size="icon" disabled className="h-9 w-9" />;
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className={cn(label ? "w-full justify-start gap-2 px-3" : "size-9")}>
					<Sun className="h-[1.2rem] w-[1.2rem] shrink-0 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] shrink-0 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					{label ? <span className="text-sm">{label}</span> : <span className="sr-only">Toggle theme</span>}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					className={cn(theme === "light" && "bg-muted font-medium text-foreground")}>
					<Sun className="mr-2 h-4 w-4" />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					className={cn(theme === "dark" && "bg-muted font-medium text-foreground")}>
					<Moon className="mr-2 h-4 w-4" />
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("system")}
					className={cn(theme === "system" && "bg-muted font-medium text-foreground")}>
					<Monitor className="mr-2 h-4 w-4" />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
