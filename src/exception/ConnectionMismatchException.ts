import ApiException from "./ApiException";
import Response from "../http/Response";

export default class ConnectionMismatchException extends ApiException {

    constructor(response: Response) {
        super(response);
    }

}