"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";
import type { EventData } from "@/lib/events";
import type { Athlete } from "@/lib/athletes";
import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface Props {
	event: EventData;
	athletes: Athlete[];
}

export function EventResults({ event, athletes }: Props) {
	const athleteMap = Object.fromEntries(athletes.map((athlete) => [athlete.id, athlete]));

	const table = useReactTable({
		data: event.results,
		columns: getColumns({
			athletes: athleteMap,
			translations: useTranslations("events.table"),
		}),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return <DataTable table={table} />;
}
