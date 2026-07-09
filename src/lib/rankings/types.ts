export interface AthleteRanking {
	athleteId: string;
	rank: number;
	wins: number;
	losses: number;
	points: number;
}

export interface Ranking {
	id: string;
	entries: AthleteRanking[];
}
