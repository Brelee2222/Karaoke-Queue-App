export default class DeQueue<T> {
    protected items : T[] = [];

    addFirst(item : T) {
        this.items.unshift(item);
    }

    addLast(item : T) {
        this.items.push(item);
    }

    removeFirst() : T | null {
        return this.items.shift() ?? null;
    }

    removeLast() : T | null {
        return this.items.splice(-1)[0] ?? null;
    }

    copyItems() {
        return [...this.items];
    }
}