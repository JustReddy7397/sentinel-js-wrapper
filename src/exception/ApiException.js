"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiException extends Error {
    constructor(response) {
        super(`${response.getStatus} - ${response.getType}: ${response.getMessage}`);
        this.response = response;
    }
    get getResponse() {
        return this.response;
    }
}
exports.default = ApiException;
