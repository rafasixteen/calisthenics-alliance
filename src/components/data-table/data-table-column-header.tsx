import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	...props
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div {...props}>{title}</div>;
	}

	const sorted = column.getIsSorted();

	function cycleSorting() {
		if (sorted === false) {
			column.toggleSorting(false);
		} else if (sorted === "asc") {
			column.toggleSorting(true);
		} else {
			column.clearSorting();
		}
	}

	return (
		<Button variant="ghost" size="sm" onClick={cycleSorting}>
			<div {...props}>{title}</div>
			{sorted === "desc" ? <ArrowDown /> : sorted === "asc" ? <ArrowUp /> : <ChevronsUpDown />}
		</Button>
	);
}
