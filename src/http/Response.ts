import SentinelClient from "../SentinelClient";
import {fromJson} from "../json/gson";

export default class Response {

    private readonly status: string
    private readonly timeStamp: number
    private readonly message: string
    private readonly type: string
    private readonly result: string // JSON

    constructor(status: string, timeStamp: number, message: string, type: string, result: string) {
        this.status = status;
        this.timeStamp = timeStamp;
        this.message = message;
        this.type = type;
        this.result = result;
    }

    getResult<T>(key: string, resultType: { new(...args: any[]): T }): T | null {
        if (this.result == null) {
            return null;
        }

        const toStringJson = JSON.stringify(this.result);

        return JSON.parse(toStringJson)[key];
    }


    get getStatus(): string {
        return this.status;
    }

    get getTimeStamp(): number {
        return this.timeStamp;
    }

    get getMessage(): string {
        return this.message;
    }

    get getType(): string {
        return this.type;
    }

    get getResultString(): string {
        return this.result;
    }

    toString(): string {
        return "Response(status=" + this.status + ", timeStamp=" + this.timeStamp + ", message=" + this.message + ", type=" + this.type + ", result=" + this.result + ")"
    }

}