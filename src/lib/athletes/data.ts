import { promises as fs } from "fs";
import path from "path";
import type { Athlete } from "./types";

const ATHLETES_FILE = path.join(process.cwd(), "public", "data", "athletes.json");

export async function getAthletes(): Promise<Athlete[]> {
	const json = await fs.readFile(ATHLETES_FILE, "utf8");
	return JSON.parse(json);
}
