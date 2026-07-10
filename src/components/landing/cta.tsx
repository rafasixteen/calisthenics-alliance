import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf0g8r5k6J3x7Z2y9z5j/viewform?usp=sf_link";

export function CTA() {
	const translations = useTranslations("home.cta");

	return (
		<section className="border-t px-6 py-10 text-center">
			<h2 className="text-3xl font-semibold tracking-tight">{translations("title")}</h2>
			<p className="mt-4 text-muted-foreground">{translations("description")}</p>

			<div className="mt-8">
				<Button asChild className="px-8 py-4 text-sm">
					<a href={GOOGLE_FORMS_URL} target="_blank" rel="noopener noreferrer">
						{translations("button")}
					</a>
				</Button>
			</div>
		</section>
	);
}
