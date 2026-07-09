"use client";

import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { url } from "@/lib/url";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LocaleSwitcher } from "@/components/locale-switcher";

export function Navbar() {
	const locale = useLocale();
	const translations = useTranslations("navbar");

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:grid md:grid-cols-3">
				{/* Left: Logo */}
				<div className="flex justify-start">
					<Link href="/" className="font-semibold tracking-tight">
						CAL
					</Link>
				</div>

				{/* Center: Links (desktop only) */}
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

					<Link href="/events" className="transition hover:text-foreground">
						{translations("events")}
					</Link>
				</nav>

				{/* Right: switchers (desktop) + hamburger (mobile) */}
				<div className="flex items-center justify-end gap-1">
					{/* Desktop switchers */}
					<div className="hidden items-center gap-1 md:flex">
						<LocaleSwitcher />
						<ThemeSwitcher />
					</div>

					{/* Mobile menu trigger */}
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => alert("tapped")}>
									<Menu className="h-5 w-5" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-72">
								<SheetHeader>
									<SheetTitle className="text-left">Menu</SheetTitle>
								</SheetHeader>

								<nav className="mt-6 flex flex-col gap-1 text-sm">
									<SheetClose asChild>
										<a
											href={url(`/regulations/${locale}.pdf`)}
											target="_blank"
											rel="noopener noreferrer"
											className="rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
											{translations("regulation")}
										</a>
									</SheetClose>

									<SheetClose asChild>
										<Link
											href="/rankings"
											className="rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
											{translations("rankings")}
										</Link>
									</SheetClose>

									<SheetClose asChild>
										<Link
											href="/events"
											className="rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
											{translations("events")}
										</Link>
									</SheetClose>
								</nav>

								<div className="mt-6 flex items-center gap-2 border-t pt-6">
									<LocaleSwitcher />
									<ThemeSwitcher />
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
