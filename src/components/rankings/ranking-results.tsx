"use client";

import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";
import type { Athlete } from "@/lib/athletes";
import { getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Ranking } from "@/lib/rankings";

interface Props {
	ranking: Ranking;
	athletes: Athlete[];
}

export function RankingResults({ ranking, athletes }: Props) {
	const athleteMap = Object.fromEntries(athletes.map((athlete) => [athlete.id, athlete]));

	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: ranking.entries,
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
