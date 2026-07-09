import { Link } from "@/i18n/navigation";
import { getEvents } from "@/lib/events/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ChevronRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

interface Params {
	locale: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function EventsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const events = await getEvents();

	return (
		<main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-16">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Events</h1>
				<p className="text-muted-foreground">
					{events.length} event{events.length !== 1 && "s"}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
				{events.map((event) => {
					const date = new Intl.DateTimeFormat("en-GB", {
						dateStyle: "medium",
					}).format(new Date(event.date));

					return (
						<Link key={event.id} href={`/events/${event.id}`} className="group">
							<Card className="h-full transition-colors group-hover:bg-muted/50">
								<CardContent className="flex h-full flex-col gap-2 p-3.5 sm:gap-3 sm:p-5">
									<div className="flex items-start justify-between gap-2">
										<Badge
											variant="secondary"
											className="text-[10px] tracking-wide uppercase sm:text-xs">
											{event.type}
										</Badge>
										<ChevronRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block" />
									</div>

									<div className="flex-1 space-y-1">
										<h2 className="text-sm leading-snug font-semibold sm:text-base">
											{event.name}
										</h2>
										<p className="text-xs text-muted-foreground sm:text-sm">
											Season {event.season}
										</p>
									</div>

									<div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:gap-2 sm:text-sm">
										<CalendarDays className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
										<span>{date}</span>
									</div>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
		</main>
	);
}
