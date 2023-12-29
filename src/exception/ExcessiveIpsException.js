"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiException_1 = __importDefault(require("./ApiException"));
class ExcessiveIpsException extends ApiException_1.default {
    constructor(response) {
        super(response);
        this.maxIps = response.getResult("maxIps", Number);
    }
    get getMaxIps() {
        return this.maxIps;
    }
}
exports.default = ExcessiveIpsException;
