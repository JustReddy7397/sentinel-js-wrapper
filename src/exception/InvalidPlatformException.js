"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiException_1 = __importDefault(require("./ApiException"));
class InvalidPlatformException extends ApiException_1.default {
    constructor(response) {
        super(response);
        this.platform = response.getResult("platform", String);
    }
    get getPlatform() {
        return this.platform;
    }
}
exports.default = InvalidPlatformException;
