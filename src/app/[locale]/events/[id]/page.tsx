import { notFound } from "next/navigation";
import { EventResults } from "@/components/events";
import { EventSummary, getEvent, getEvents } from "@/lib/events";
import { getAthletes } from "@/lib/athletes";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, ListOrdered } from "lucide-react";

export async function generateStaticParams() {
	const events = await getEvents();

	return events.map((event: EventSummary) => ({
		id: event.id,
	}));
}

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function EventPage({ params }: Props) {
	const { id } = await params;

	const event = await getEvent(id);
	const athletes = await getAthletes();

	if (!event) {
		notFound();
	}

	const date = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "full",
	}).format(new Date(event.date));

	return (
		<main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
				{/* Eyebrow + title */}
				<div className="space-y-3">
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary" className="tracking-wide uppercase">
							{event.type}
						</Badge>
						<span className="text-sm text-muted-foreground">Season {event.season}</span>
					</div>

					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{event.name}</h1>

					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<CalendarDays className="h-4 w-4 shrink-0" />
						<span>{date}</span>
					</div>
				</div>

				{/* Routine cards */}
				<div className="flex w-full flex-col gap-4 lg:w-80 lg:shrink-0">
					{event.routines.map((routine) => (
						<Card key={routine.name}>
							<CardHeader>
								<CardTitle className="flex items-center text-xs text-muted-foreground">
									{routine.name}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ol className="space-y-1">
									{routine.routine.map((exercise, i) => (
										<li key={i} className="flex gap-3 text-sm">
											<span className="font-mono text-muted-foreground">
												{String(i + 1).padStart(2, "0")}
											</span>
											<span>{exercise}</span>
										</li>
									))}
								</ol>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<Separator className="my-8 sm:my-10" />

			<section className="space-y-4">
				<h2 className="text-lg font-semibold">Results</h2>
				<EventResults event={event} athletes={athletes} />
			</section>
		</main>
	);
}
