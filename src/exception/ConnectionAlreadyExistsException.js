"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiException_1 = __importDefault(require("./ApiException"));
class ConnectionAlreadyExistsException extends ApiException_1.default {
    constructor(response) {
        super(response);
        const toStringJson = JSON.stringify(response.getResult("connection", Object));
        const json = JSON.parse(toStringJson);
        this.connectionPlatform = json["platform"];
        this.connectionValue = json["value"];
    }
    get getConnectionPlatform() {
        return this.connectionPlatform;
    }
    get getConnectionValue() {
        return this.connectionValue;
    }
}
exports.default = ConnectionAlreadyExistsException;
