import { promises as fs } from "fs";
import path from "path";
import type { Ranking } from "./types";

const RANKINGS_FILE = path.join(process.cwd(), "public", "data", "rankings");

export async function getRanking(id: string): Promise<Ranking> {
	const json = await fs.readFile(path.join(RANKINGS_FILE, `${id}.json`), "utf8");
	return JSON.parse(json);
}

export async function getRankings(): Promise<string[]> {
	const files = await fs.readdir(RANKINGS_FILE);
	return files
		.filter((file) => file.endsWith(".json"))
		.map((file) => file.replace(".json", ""))
		.sort((a, b) => parseInt(b) - parseInt(a));
}
