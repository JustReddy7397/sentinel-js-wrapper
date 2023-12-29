"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UncheckedApiException extends Error {
    constructor(response) {
        super(`${response === null || response === void 0 ? void 0 : response.getStatus} - ${response === null || response === void 0 ? void 0 : response.getType}: ${response === null || response === void 0 ? void 0 : response.getMessage}`);
        this.response = response;
    }
    get getResponse() {
        return this.response;
    }
}
exports.default = UncheckedApiException;
