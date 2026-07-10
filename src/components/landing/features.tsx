import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Features() {
	const translations = useTranslations("home.features");
	const features = ["rankings", "events"];

	return (
		<section className="px-6 py-10">
			<div className="mx-auto max-w-4xl">
				<h2 className="text-center text-3xl font-semibold tracking-tight">{translations("title")}</h2>

				<div className="mt-12 flex flex-col justify-center gap-6 md:flex-row">
					{features.map((feature) => (
						<Link
							key={feature}
							href={`/${feature}`}
							className="flex-1 rounded-xl border p-6 transition hover:border-foreground/20 hover:bg-muted/20">
							<h3 className="font-medium">{translations(`${feature}.title`)}</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								{translations(`${feature}.description`)}
							</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
