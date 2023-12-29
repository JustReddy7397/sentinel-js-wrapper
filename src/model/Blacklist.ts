export default class Blacklist {

    private readonly timestamp: number
    private readonly reason: string

    constructor(timestamp: number, reason: string) {
        this.timestamp = timestamp;
        this.reason = reason;
    }

    get getTimestamp(): number {
        return this.timestamp;
    }

    get getReason(): string {
        return this.reason;
    }

}