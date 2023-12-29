"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpMethod_1 = require("./HttpMethod");
const Request_1 = __importDefault(require("./Request"));
class RequestBuilder {
    constructor() {
        this.method = HttpMethod_1.HttpMethod.GET;
    }
    setMethod(value) {
        this.method = value;
        return this;
    }
    setApiKey(value) {
        this.apiKey = value;
        return this;
    }
    setQuery(value) {
        this.query = value;
        return this;
    }
    setBody(value) {
        this.body = value;
        return this;
    }
    build() {
        return new Request_1.default(this.method, this.apiKey, this.query, this.body);
    }
}
exports.default = RequestBuilder;
