"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(status, timeStamp, message, type, result) {
        this.status = status;
        this.timeStamp = timeStamp;
        this.message = message;
        this.type = type;
        this.result = result;
    }
    getResult(key, resultType) {
        if (this.result == null) {
            return null;
        }
        const toStringJson = JSON.stringify(this.result);
        return JSON.parse(toStringJson)[key];
    }
    get getStatus() {
        return this.status;
    }
    get getTimeStamp() {
        return this.timeStamp;
    }
    get getMessage() {
        return this.message;
    }
    get getType() {
        return this.type;
    }
    get getResultString() {
        return this.result;
    }
    toString() {
        return "Response(status=" + this.status + ", timeStamp=" + this.timeStamp + ", message=" + this.message + ", type=" + this.type + ", result=" + this.result + ")";
    }
}
exports.default = Response;
