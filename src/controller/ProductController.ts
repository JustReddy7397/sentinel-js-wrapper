import Controller from "./Controller";
import Product from "../model/Product";
import RequestBuilder from "../http/RequestBuilder";
import QueryBuilder from "../util/QueryBuilder";
import UnexpectedResponseException from "../exception/unchecked/UnexpectedResponseException";

export default class ProductController extends Controller {

    constructor(baseUrl: string) {
        super(baseUrl + "/products", null);
    }

    async getAll(): Promise<Product[]> {
        const response = await new RequestBuilder()
            .setQuery(
                new QueryBuilder(this.baseUrl).build()
            )
            .build()
            .getResponse();

        if (response?.getType === "SUCCESS") {
            return response.getResult("products", Product) as unknown as Product[];
        } else {
            throw new UnexpectedResponseException(response)
        }


    }



}