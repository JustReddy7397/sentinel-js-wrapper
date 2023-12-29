export default class Pair<K, V> {

    private readonly key: K;
    private readonly value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    getKey(): K {
        return this.key;
    }

    getValue(): V {
        return this.value;
    }

    equals(o: object): boolean {
        if (o == this) return true
        if (!(o instanceof Pair)) return false
        const other = o as Pair<K, V>
        return other.key == this.key && other.value == this.value
    }

    canEqual(o: object): boolean {
        return o instanceof Pair
    }

    hashCode(): number {
        let result = 1
        result = result * 59 + (this.key == null ? 43 : this.getHashCode(this.key.toString()))
        result = result * 59 + (this.value == null ? 43 : this.getHashCode(this.value.toString()))
        return result
    }

    getHashCode(string: string): number {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            const code = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + code;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    toString(): string {
        return "Pair(key=" + this.key + ", value=" + this.value + ")"
    }

}