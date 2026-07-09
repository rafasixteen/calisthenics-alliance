import Link from "next/link";
import type { EventSummary } from "@/lib/events";

interface EventSelectorProps {
	current: string;
	events: EventSummary[];
}

export function EventSelector({ current, events }: EventSelectorProps) {
	return (
		<nav className="flex flex-wrap gap-2">
			{events.map((event) => {
				const active = event.id === current;

				return (
					<Link
						key={event.id}
						href={`/events/${event.id}`}
						className={[
							"rounded-md border px-4 py-2 text-sm transition-colors",
							active ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
						].join(" ")}>
						{event.name}
					</Link>
				);
			})}
		</nav>
	);
}
