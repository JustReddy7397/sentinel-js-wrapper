"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
    equals(o) {
        if (o == this)
            return true;
        if (!(o instanceof Pair))
            return false;
        const other = o;
        return other.key == this.key && other.value == this.value;
    }
    canEqual(o) {
        return o instanceof Pair;
    }
    hashCode() {
        let result = 1;
        result = result * 59 + (this.key == null ? 43 : this.getHashCode(this.key.toString()));
        result = result * 59 + (this.value == null ? 43 : this.getHashCode(this.value.toString()));
        return result;
    }
    getHashCode(string) {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            const code = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + code;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    toString() {
        return "Pair(key=" + this.key + ", value=" + this.value + ")";
    }
}
exports.default = Pair;
