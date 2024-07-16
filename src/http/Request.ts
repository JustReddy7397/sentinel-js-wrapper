import ResponseDecrypter from "./ResponseDecrypter";
import {HttpMethod} from "./HttpMethod";
import Response from "./Response";
import axios, {AxiosResponse} from "axios";
import {toJson} from "../json/gson";
import LicenseCreateData from "../model/LicenseCreateData";
import {Buffer} from "node:buffer";
import moment from "moment";
export default class Request {

    private readonly userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    private static decrypter: ResponseDecrypter
    private readonly contentType = "application/json"
    private readonly httpMethod: HttpMethod
    private readonly apiKey: string;
    private readonly query: string
    private readonly body: object | null

    constructor(httpMethod: HttpMethod, apiKey: string, query: string, body: object | null) {
        this.httpMethod = httpMethod;
        this.apiKey = apiKey;
        this.query = query;
        this.body = body;
    }

    async getResponse(): Promise<Response | null> {
        let strResponse: string = "";
        try {
            let data: AxiosResponse<any> | null = null;
            const headers = {
                "User-Agent": this.userAgent,
                "Content-Type": this.contentType,
                "Authorization": "Bearer " + this.apiKey,
            };

            if (this.httpMethod === HttpMethod.GET) {
                data = await axios.get(this.query, {
                    headers,
                    data: this.body ? toJson(this.body) : undefined,
                });
            } else if (this.httpMethod === HttpMethod.POST) {
                const stringifiedBody = JSON.stringify(this.body);
                const parsedBody = JSON.parse(stringifiedBody);
                data = await axios.post(this.query, parsedBody, {
                    headers,
                });
            } else if (this.httpMethod === HttpMethod.PATCH) {
                const patchHeaders = {
                    "User-Agent": this.userAgent,
                    "Content-Type": this.contentType,
                    "Authorization": "Bearer " + this.apiKey,
                    "X-HTTP-Method-Override": "PATCH",
                };
                data = await axios.patch(this.query, this.body, {
                    headers: patchHeaders,
                    data: this.body ? toJson(this.body) : undefined,
                });
            } else if (this.httpMethod === HttpMethod.DELETE) {
                data = await axios.delete(this.query, {
                    headers,
                    data: this.body ? toJson(this.body) : undefined,
                });
            } else if (this.httpMethod === HttpMethod.PUT) {
                data = await axios.put(this.query, this.body, {
                    headers,
                    data: this.body ? toJson(this.body) : undefined,
                });
            }

            if (data) {
                strResponse = data.data;

                if (strResponse.length !== 0) {
                    let decryptedResponse = strResponse;
                    if (Request.decrypter) {
                        decryptedResponse = Request.decrypter.decrypt(strResponse);
                    }
                    const parsedResponse = JSON.parse(decryptedResponse);
                    const timeStamp = parsedResponse["timestamp"];
                    const message = parsedResponse["message"];
                    const status = parsedResponse["status"];
                    const type = parsedResponse["type"];
                    const result = parsedResponse["result"];
                    return new Response(status, timeStamp, message, type, result);
                }
            }
        } catch (err) {
            console.error(err);
            throw new Error(`Failed to parse response: ${strResponse}`);
        }

        return null;
    }

    static setDecrypter(decrypter: ResponseDecrypter) {
        Request.decrypter = decrypter;
    }


}