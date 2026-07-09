"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { EventResult } from "@/lib/events";
import type { Athlete } from "@/lib/athletes";
import { formatTime } from "@/lib/format";
import { DataTableColumnHeader } from "@/components/data-table";

interface Options {
	athletes: Record<string, Athlete>;
}

export function getColumns({ athletes }: Options): ColumnDef<EventResult>[] {
	const columns: ColumnDef<EventResult>[] = [
		{
			id: "athlete",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Athlete" />,
			accessorFn: (row) => athletes[row.athleteId]?.name ?? row.athleteId,
			cell: ({ row }) => {
				const athlete = athletes[row.original.athleteId];
				const athleteName = athlete?.name ?? row.original.athleteId;
				return <div className="min-w-0 truncate">{athleteName}</div>;
			},
		},
		{
			id: "time",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Time" />,
			accessorFn: (row) => row.time_seconds,
			cell: ({ getValue }) => formatTime(getValue<number>()),
		},
		{
			id: "result",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Result" />,
			accessorFn: (row) => row.won,
			cell: ({ getValue }) => {
				const value = getValue<boolean | undefined>();

				if (value === undefined) {
					return "—";
				}

				return value ? "V" : "D";
			},
		},
		{
			id: "points",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Points" />,
			accessorFn: (row) => row.points,
			cell: ({ row }) => {
				const points = row.original.points;
				return points?.toString() ?? "—";
			},
		},
	];

	return columns;
}
