"use client";

import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { cn } from "@/lib/cn";

const localeLabels: Record<string, string> = {
	en: "English",
	pt: "Português",
};

interface LocaleSwitcherProps {
	label?: string;
}

export function LocaleSwitcher({ label }: LocaleSwitcherProps) {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	function onSelect(nextLocale: string) {
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale });
		});
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					disabled={isPending}
					className={cn(label ? "w-full justify-start gap-2 px-3" : "h-9 w-9", !label && "size-9")}>
					<Languages className="h-[1.2rem] w-[1.2rem] shrink-0" />
					{label ? <span className="text-sm">{label}</span> : <span className="sr-only">Switch locale</span>}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{routing.locales.map((loc) => (
					<DropdownMenuItem
						key={loc}
						onClick={() => onSelect(loc)}
						className={cn(loc === locale && "bg-muted font-medium text-foreground")}>
						{localeLabels[loc] ?? loc}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
