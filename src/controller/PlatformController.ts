import Controller from "./Controller";
import RequestBuilder from "../http/RequestBuilder";
import QueryBuilder from "../util/QueryBuilder";
import UnexpectedResponseException from "../exception/unchecked/UnexpectedResponseException";

export default class PlatformController extends Controller {

    constructor(baseUrl: string) {
        super(baseUrl + "/platforms", null);
    }

    async getAll() : Promise<string[]> {
        const response = await new RequestBuilder()
            .setQuery(
                new QueryBuilder(this.baseUrl).build()
            ).build().getResponse();
        if (response?.getType === "SUCCESS") {
            return response.getResult("platforms", String) as unknown as string[];
        } else {
            throw new UnexpectedResponseException(response);
        }
    }

}