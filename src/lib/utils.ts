import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBasePath() {
	if (process.env.NODE_ENV === "production") {
		return process.env.NEXT_PUBLIC_BASE_PATH || "";
	}

	return "";
}
