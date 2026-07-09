import { getRanking, getRankings } from "@/lib/rankings";
import { getAthletes } from "@/lib/athletes";
import { notFound } from "next/navigation";
import { RankingResults } from "@/components/rankings";

export async function generateStaticParams() {
	const rankings = await getRankings();

	return rankings.map((id: string) => ({
		id: id,
	}));
}

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function RankingPage({ params }: Props) {
	const { id } = await params;

	const ranking = await getRanking(id);
	const athletes = await getAthletes();

	if (!ranking) {
		notFound();
	}

	return (
		<main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
			<RankingResults ranking={ranking} athletes={athletes} />
		</main>
	);
}
