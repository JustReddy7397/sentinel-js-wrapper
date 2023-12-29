import Response from "../../http/Response";
import UncheckedApiException from "./UncheckedApiException";

export default class UnexpectedResponseException extends UncheckedApiException {

    constructor(response: Response | null) {
        super(response);
    }

}