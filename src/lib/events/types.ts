export type EventType = "open" | "regular" | "final";

export interface EventResult {
	athleteId: string;

	sets?: number;
	reps?: number;
	time_seconds: number;

	points?: number;
	won?: boolean;
}

export interface EventData {
	id: string;
	name: string;
	date: string;
	season: string;
	type: EventType;
	routines: Routine[];
	results: EventResult[];
}

export interface Routine {
	name: string;
	routine: string[];
}

export interface EventSummary {
	id: string;
	name: string;
	date: string;
	season: string;
	type: EventType;
}
