import { nextSingersQueue, pastSingersQueue } from "./karaokeQueue";
import { KaraokeEntry, KaraokeFullQueue } from "@/utils/types";

let currentSingerEntry : KaraokeEntry | null = null;

export function addToKaraokeQ(entry : KaraokeEntry) : void {
    nextSingersQueue.addLast(entry);
}

export function advanceKaraokeQ() : void {
    const nextSingerEntry = nextSingersQueue.removeFirst();

    if(nextSingerEntry == null)
        return;

    if(currentSingerEntry != null)
        pastSingersQueue.addFirst(currentSingerEntry);

    currentSingerEntry = nextSingerEntry;
}

export function rewindKaraokeQ() : void {
    const prevSinger = pastSingersQueue.removeFirst();
    
    if(prevSinger == null)
        return;

    if(currentSingerEntry != null)
        nextSingersQueue.addFirst(currentSingerEntry);

    currentSingerEntry = prevSinger;
}

export function removeSingerEntry(entryID : string) : void {
    nextSingersQueue.removeEntry(entryID);
}

export function updateKaraokeEntries(entries : KaraokeEntry[]) : void {
    nextSingersQueue.updateEntries(entries);
    pastSingersQueue.updateEntries(entries);
}

export function getKaraokeQInfo() : KaraokeFullQueue {
    return {
        nextSingers: nextSingersQueue.copyItems(),
        pastSingers: pastSingersQueue.copyItems()
    };
}

export function getCurrentKaraokeEntry() : KaraokeEntry | null {
    return currentSingerEntry;
}