export function secondsToHours(seconds: number): string {
    const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
    const hours = zeroLeft((seconds / 3600) % 60)
    const min = zeroLeft((seconds / 60) % 60);
    const sec = zeroLeft((seconds % 60) % 60);
    return `${hours}:${min}:${sec}`
}