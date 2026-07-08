"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { url } from "@/lib/url";

export function Navbar() {
	const locale = useLocale();
	const translations = useTranslations("navbar");

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:grid md:grid-cols-3">
				{/* Left: Logo */}
				<div className="flex justify-start">
					<Link href="/" className="font-semibold tracking-tight">
						CAL
					</Link>
				</div>

				{/* Center: Links */}
				<nav className="hidden justify-center gap-8 text-sm text-muted-foreground md:flex">
					<a
						href={url(`/regulations/${locale}.pdf`)}
						target="_blank"
						rel="noopener noreferrer"
						className="transition hover:text-foreground">
						{translations("regulation")}
					</a>

					<Link href="/rankings" className="transition hover:text-foreground">
						{translations("rankings")}
					</Link>
				</nav>
			</div>
		</header>
	);
}
