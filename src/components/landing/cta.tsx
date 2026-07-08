import { useTranslations } from "next-intl";

export function CTA() {
	const translations = useTranslations("home.cta");

	return (
		<section className="border-t px-6 py-20">
			<div className="mx-auto max-w-6xl text-center">
				<h2 className="text-3xl font-semibold tracking-tight">{translations("title")}</h2>
				<p className="mt-4 text-muted-foreground">{translations("description")}</p>

				<div className="mt-8">
					<a className="rounded-md bg-foreground px-6 py-3 text-sm text-background transition hover:opacity-90">
						{translations("button")}
					</a>
				</div>
			</div>
		</section>
	);
}
