import { Link } from "@/i18n/navigation";
import { getRankings } from "@/lib/rankings";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ChevronRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Params {
	locale: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function RankingsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const translations = await getTranslations("rankings");
	const rankings = await getRankings();

	return (
		<div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-16">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{translations("title")}</h1>
				<p className="text-muted-foreground">{translations("seasons", { count: rankings.length })}</p>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
				{rankings.map((year) => (
					<Link key={year} href={`/rankings/${year}`} className="group">
						<Card className="h-full transition-colors group-hover:bg-muted/50">
							<CardContent className="flex items-center gap-4 p-5">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
									<Trophy className="h-5 w-5 text-muted-foreground" />
								</div>

								<div className="flex-1">
									<div className="text-sm text-muted-foreground">{translations("season")}</div>
									<div className="text-lg font-semibold">{year}</div>
								</div>

								<ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
