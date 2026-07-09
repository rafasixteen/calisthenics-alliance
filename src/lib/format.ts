/**
 * Formats a duration in seconds into the competition time format.
 *
 * Examples:
 * - 58.2  -> 58.2''
 * - 59    -> 59''
 * - 125.4 -> 2'05.4''
 * - 305   -> 5'05''
 *
 * @param totalSeconds The duration in seconds.
 * @returns The formatted time as ss'' / ss.s'' / m'ss'' / m'ss.s''.
 */
export function formatTime(totalSeconds: number): string {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	const formattedSeconds = Number.isInteger(seconds)
		? seconds.toString().padStart(minutes > 0 ? 2 : 1, "0")
		: seconds.toFixed(1).padStart(minutes > 0 ? 4 : 1, "0");

	if (minutes === 0) {
		return `${formattedSeconds}''`;
	}

	return `${minutes}'${formattedSeconds}''`;
}
