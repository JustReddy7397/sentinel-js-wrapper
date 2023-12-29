import {HttpMethod} from "./HttpMethod";
import Request from "./Request";
export default class RequestBuilder {

    private method: HttpMethod = HttpMethod.GET
    private apiKey: string
    private query: string
    private body: object | null

    setMethod(value: HttpMethod) : RequestBuilder {
        this.method = value;
        return this
    }

    setApiKey(value: string) : RequestBuilder {
        this.apiKey = value;
        return this
    }

    setQuery(value: string) : RequestBuilder {
        this.query = value;
        return this
    }

    setBody(value: object | null) : RequestBuilder {
        this.body = value;
        return this
    }

    build() : Request {
        return new Request(this.method, this.apiKey, this.query, this.body);
    }

}