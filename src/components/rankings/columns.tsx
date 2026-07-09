"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import type { AthleteRanking } from "@/lib/rankings";
import type { Athlete } from "@/lib/athletes";
import { TranslationValues } from "next-intl";

interface Options {
	athletes: Record<string, Athlete>;
	translations: (key: string, values?: TranslationValues) => string;
}

export function getColumns({ athletes, translations }: Options): ColumnDef<AthleteRanking>[] {
	const columns: ColumnDef<AthleteRanking>[] = [
		{
			id: "rank",
			header: ({ column }) => <DataTableColumnHeader column={column} title={translations("rank")} />,
			accessorFn: (row) => row.rank,
			cell: ({ row }) => row.original.rank,
		},
		{
			id: "athlete",
			header: ({ column }) => <DataTableColumnHeader column={column} title={translations("athlete")} />,
			accessorFn: (row) => athletes[row.athleteId]?.name ?? row.athleteId,
			cell: ({ row }) => {
				const athlete = athletes[row.original.athleteId];
				const athleteName = athlete?.name ?? row.original.athleteId;
				return <div className="min-w-0 truncate">{athleteName}</div>;
			},
		},
		{
			id: "wins",
			header: ({ column }) => <DataTableColumnHeader column={column} title={translations("wins")} />,
			accessorFn: (row) => row.wins,
		},
		{
			id: "losses",
			header: ({ column }) => <DataTableColumnHeader column={column} title={translations("losses")} />,
			accessorFn: (row) => row.losses,
		},
		{
			id: "points",
			header: ({ column }) => <DataTableColumnHeader column={column} title={translations("points")} />,
			accessorFn: (row) => row.points,
		},
	];

	return columns;
}
