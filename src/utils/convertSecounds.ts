export function minutesToSecounds(minutes: number): number {
    const secounds = minutes * 60;
    return secounds;
}

export function secoundsToMinute(secounds: number): number {
    const min = ((secounds / 60) % 60)
    return min;
}