import Image from "next/image";
import { Marquee, MarqueeItem, MarqueeContent } from "@/components/kibo-ui/marquee";
import { useTranslations } from "next-intl";
import { url } from "@/lib/url";

interface Sponsor {
	name: string;
	src: string | (() => string);
	scale?: number;
}

const sponsors: Sponsor[] = [
	{
		name: "BG Bars",
		src: () => url("/logos/bg-bars.svg"),
		scale: 0.7,
	},
	{
		name: "GORNATION",
		src: "https://www.gornation.com/cdn/shop/files/GOR_LOGO_SCHRIFT_WHITE_250x.png?v=1657115144",
	},
];

export function Sponsors() {
	const translations = useTranslations("home.sponsors");

	return (
		<section className="border-t px-4 py-10">
			<p className="text-center text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
				{translations("trusted")}
			</p>

			<div className="mt-8">
				{/* Mobile */}
				<div className="md:hidden">
					<Marquee>
						<MarqueeContent
							speed={50}
							pauseOnClick={false}
							pauseOnHover={false}
							className="overflow-hidden">
							{sponsors.map((sponsor) => (
								<MarqueeItem key={sponsor.name}>
									<SponsorLogo sponsor={sponsor} />
								</MarqueeItem>
							))}
						</MarqueeContent>
					</Marquee>
				</div>

				{/* Desktop */}
				<div className="hidden flex-wrap items-center justify-center gap-x-12 gap-y-8 md:flex">
					{sponsors.map((sponsor) => (
						<SponsorLogo key={sponsor.name} sponsor={sponsor} />
					))}
				</div>
			</div>
		</section>
	);
}

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
	const src = typeof sponsor.src === "function" ? sponsor.src() : sponsor.src;

	return (
		<div className="group flex h-16 max-w-40 items-center justify-center">
			<Image
				src={src}
				alt={sponsor.name}
				width={220}
				height={80}
				style={{
					transform: `scale(${sponsor.scale ?? 1})`,
				}}
				className="object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
			/>
		</div>
	);
}
