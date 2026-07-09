import { promises as fs } from "fs";
import path from "path";

import type { EventData, EventSummary } from "./types";

const EVENTS_DIR = path.join(process.cwd(), "public", "data", "events");

export async function getEvents(): Promise<EventSummary[]> {
	const files = await fs.readdir(EVENTS_DIR);

	const events = await Promise.all(
		files
			.filter((file) => file.endsWith(".json"))
			.map(async (file) => {
				const json = await fs.readFile(path.join(EVENTS_DIR, file), "utf8");
				const event = JSON.parse(json) as EventData;

				return {
					id: event.id,
					name: event.name,
					date: event.date,
					season: event.season,
					type: event.type,
				};
			}),
	);

	return events.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getEvent(id: string): Promise<EventData | null> {
	try {
		const json = await fs.readFile(path.join(EVENTS_DIR, `${id}.json`), "utf8");
		return JSON.parse(json);
	} catch {
		return null;
	}
}
