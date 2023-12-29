"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Blacklist {
    constructor(timestamp, reason) {
        this.timestamp = timestamp;
        this.reason = reason;
    }
    get getTimestamp() {
        return this.timestamp;
    }
    get getReason() {
        return this.reason;
    }
}
exports.default = Blacklist;
