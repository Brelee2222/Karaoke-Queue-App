import DeQueue from "./DeQueue";
import { KaraokeEntry } from "@/utils/types";

const PAST_SINGERS_QUEUE_SIZE = 6;

export class SingersDeQueue extends DeQueue<KaraokeEntry> {
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

export class RandomQueue extends SingersDeQueue {
    // The point in the queue where randomness will be applied.
    private randomIndexCutoff = 0;

    addFirst(item: KaraokeEntry): void {
        super.addFirst(item);

        this.randomIndexCutoff++;
    }

    removeFirst(): KaraokeEntry | null {
        if(this.randomIndexCutoff != 0) { // If the next item is not random, remove it
            this.randomIndexCutoff--;
            return super.removeFirst();
        }

        // Remove and return the randomly selected item
        const selectedItem = this.items.splice( this.selectRandomIndex() , 1)[0];

        return selectedItem;
    }

    selectRandomIndex() : number {
        // Generate random number
        return Math.floor(this.items.length * Math.random()); 
    }
}

export class PseudoRandomQueue extends RandomQueue {
    private static readonly PRIORITY_WEIGHT = 3;

    selectRandomIndex() : number {
        // Generate random number
        return Math.floor( 
            this.items.length * Math.pow( Math.random() , PseudoRandomQueue.PRIORITY_WEIGHT )
        ); 
    }
}

export class PastSingersDeQueue extends SingersDeQueue {
    override addFirst(item : KaraokeEntry) {
        const result = super.addFirst(item);

        this.items.splice(PAST_SINGERS_QUEUE_SIZE); // Crops the list to size

        return result;
    }
}