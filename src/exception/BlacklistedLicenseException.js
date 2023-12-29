"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiException_1 = __importDefault(require("./ApiException"));
const Blacklist_1 = __importDefault(require("../model/Blacklist"));
class BlacklistedLicenseException extends ApiException_1.default {
    constructor(response) {
        super(response);
        this.blacklist = response.getResult("blacklist", Blacklist_1.default);
    }
    get getBlacklist() {
        return this.blacklist;
    }
}
exports.default = BlacklistedLicenseException;
