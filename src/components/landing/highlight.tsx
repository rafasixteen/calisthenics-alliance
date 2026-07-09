import { useTranslations } from "next-intl";

export function Highlight() {
	const t = useTranslations("home.highlight");

	return (
		<section className="border-t px-6 py-20">
			<div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-12 md:grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
					<p className="mt-4 text-muted-foreground">{t("description")}</p>
				</div>

				<div className="h-80 w-full rounded-xl border bg-muted" />
			</div>
		</section>
	);
}
