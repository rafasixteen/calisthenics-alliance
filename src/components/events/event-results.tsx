"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";
import type { EventData } from "@/lib/events";
import type { Athlete } from "@/lib/athletes";
import { getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

interface Props {
	event: EventData;
	athletes: Athlete[];
}

export function EventResults({ event, athletes }: Props) {
	const athleteMap = Object.fromEntries(athletes.map((athlete) => [athlete.id, athlete]));

	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: event.results,
		columns: getColumns({
			athletes: athleteMap,
		}),
		state: {
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
	});

	return <DataTable table={table} />;
}
