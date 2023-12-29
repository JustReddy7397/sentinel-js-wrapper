import ApiException from "./ApiException";
import Response from "../http/Response";

export default class InvalidProductException extends ApiException {

    constructor(response: Response) {
        super(response);
    }

}