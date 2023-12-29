"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpMethod_1 = require("./HttpMethod");
const Response_1 = __importDefault(require("./Response"));
const axios_1 = __importDefault(require("axios"));
const gson_1 = require("../json/gson");
class Request {
    constructor(httpMethod, apiKey, query, body) {
        this.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
        this.contentType = "application/json";
        this.httpMethod = httpMethod;
        this.apiKey = apiKey;
        this.query = query;
        this.body = body;
    }
    getResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            let strResponse = "";
            try {
                let data = null;
                const headers = {
                    "User-Agent": this.userAgent,
                    "Content-Type": this.contentType,
                    "Authorization": "Bearer " + this.apiKey,
                };
                if (this.httpMethod === HttpMethod_1.HttpMethod.GET) {
                    data = yield axios_1.default.get(this.query, {
                        headers,
                        data: this.body ? (0, gson_1.toJson)(this.body) : undefined,
                    });
                }
                else if (this.httpMethod === HttpMethod_1.HttpMethod.POST) {
                    const stringifiedBody = JSON.stringify(this.body);
                    const parsedBody = JSON.parse(stringifiedBody);
                    data = yield axios_1.default.post(this.query, parsedBody, {
                        headers,
                    });
                }
                else if (this.httpMethod === HttpMethod_1.HttpMethod.PATCH) {
                    const patchHeaders = {
                        "User-Agent": this.userAgent,
                        "Content-Type": this.contentType,
                        "Authorization": "Bearer " + this.apiKey,
                        "X-HTTP-Method-Override": "PATCH",
                    };
                    data = yield axios_1.default.patch(this.query, this.body, {
                        headers: patchHeaders,
                        data: this.body ? (0, gson_1.toJson)(this.body) : undefined,
                    });
                }
                else if (this.httpMethod === HttpMethod_1.HttpMethod.DELETE) {
                    data = yield axios_1.default.delete(this.query, {
                        headers,
                        data: this.body ? (0, gson_1.toJson)(this.body) : undefined,
                    });
                }
                else if (this.httpMethod === HttpMethod_1.HttpMethod.PUT) {
                    data = yield axios_1.default.put(this.query, this.body, {
                        headers,
                        data: this.body ? (0, gson_1.toJson)(this.body) : undefined,
                    });
                }
                if (data) {
                    strResponse = data.data;
                    if (strResponse.length !== 0) {
                        let decryptedResponse = strResponse;
                        if (Request.decrypter) {
                            decryptedResponse = Request.decrypter.decrypt(JSON.stringify(strResponse));
                        }
                        const stringyfiedResponse = JSON.stringify(decryptedResponse);
                        const parsedResponse = JSON.parse(stringyfiedResponse);
                        const timeStamp = parsedResponse["timestamp"];
                        const message = parsedResponse["message"];
                        const status = parsedResponse["status"];
                        const type = parsedResponse["type"];
                        const result = parsedResponse["result"];
                        return new Response_1.default(status, timeStamp, message, type, result);
                    }
                }
            }
            catch (err) {
                console.error(err);
                throw new Error(`Failed to parse response: ${strResponse}`);
            }
            return null;
        });
    }
    set decrypter(decrypter) {
        Request.decrypter = decrypter;
    }
}
exports.default = Request;
