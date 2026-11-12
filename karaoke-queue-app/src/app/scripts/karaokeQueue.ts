import DeQueue from "./DeQueue";
import { KaraokeEntry } from "@/utils/types";

const PAST_SINGERS_QUEUE_SIZE = 6;

class SingersDeQueue extends DeQueue<KaraokeEntry> {
    // Removes an item from the queue, given the id
    removeEntry(entryID : string) {
        this.items.splice(
            this.items.findIndex(entry => entry.entryID == entryID),
            1
        );
    }

    // Sets the entries' values to reflect the new entries with the same entryID
    updateEntries(entries : KaraokeEntry[]) {
        // Replaces each entry with a possible existing new one
        this.items = this.items.map(currentEntry => 
            entries.find(newEntry => currentEntry.entryID == newEntry.entryID) ??
            currentEntry
        );
    }
}

class PastSingersDeQueue extends SingersDeQueue {
    override addFirst(item : KaraokeEntry) {
        const result = super.addFirst(item);

        this.items.splice(PAST_SINGERS_QUEUE_SIZE); // Crops the list to size

        return result;
    }
}

export const 
    nextSingersQueue = new SingersDeQueue(),
    pastSingersQueue = new PastSingersDeQueue();