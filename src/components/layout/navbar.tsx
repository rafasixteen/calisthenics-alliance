"use client";

import { CalendarDays, FileText, Menu, Trophy } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { url } from "@/lib/url";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LocaleSwitcher } from "@/components/locale-switcher";
import Image from "next/image";

const navLinkVariants = cva("text-muted-foreground transition hover:text-foreground", {
	variants: {
		variant: {
			desktop: "",
			mobile: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted",
		},
	},
	defaultVariants: {
		variant: "desktop",
	},
});

function NavLinks({ variant }: VariantProps<typeof navLinkVariants>) {
	const locale = useLocale();
	const translations = useTranslations("navbar");

	const className = navLinkVariants({ variant });
	const showIcon = variant === "mobile";

	const items = [
		<a
			key="regulation"
			href={url(`/regulations/${locale}.pdf`)}
			target="_blank"
			rel="noopener noreferrer"
			className={className}>
			{showIcon && <FileText className="h-4 w-4 shrink-0" />}
			{translations("regulation")}
		</a>,
		<Link key="rankings" href="/rankings" className={className}>
			{showIcon && <Trophy className="h-4 w-4 shrink-0" />}
			{translations("rankings")}
		</Link>,
		<Link key="events" href="/events" className={className}>
			{showIcon && <CalendarDays className="h-4 w-4 shrink-0" />}
			{translations("events")}
		</Link>,
	];

	if (variant === "mobile") {
		return (
			<>
				{items.map((item) => (
					<SheetClose asChild key={item.key}>
						{item}
					</SheetClose>
				))}
			</>
		);
	}

	return <>{items}</>;
}

export function Navbar() {
	const translations = useTranslations("navbar");

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b bg-background">
			<div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:grid md:grid-cols-3">
				{/* Left: Logo */}
				<div className="flex justify-start">
					<Link href="/" className="flex items-center">
						<Image
							src={url("/assets/logo-transparent.png")}
							alt="CAL"
							width={1200}
							height={1200}
							className="h-12 w-auto"
						/>
					</Link>
				</div>

				{/* Center: Links (desktop only) */}
				<nav className="hidden justify-center gap-8 text-sm text-muted-foreground md:flex">
					<NavLinks variant="desktop" />
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
						<Sheet modal={false}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="size-10">
									<Menu className="size-5" />
									<span className="sr-only">{translations("openMenu")}</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="top"
								showCloseButton={false}
								className="flex flex-col border-t bg-background p-0"
								style={{ top: "4rem" }}>
								<div className="flex flex-col gap-6 overflow-y-auto p-6">
									<nav className="-mx-3 flex flex-col gap-1">
										<NavLinks variant="mobile" />
									</nav>

									<div className="pt-6">
										<p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
											{translations("preferences")}
										</p>
										<div className="-mx-3 flex flex-col gap-1">
											<LocaleSwitcher label={translations("language")} />
											<ThemeSwitcher label={translations("theme")} />
										</div>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
