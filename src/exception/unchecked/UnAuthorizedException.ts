import UncheckedApiException from "./UncheckedApiException";
import Response from "../../http/Response";
export default class UnAuthorizedException extends UncheckedApiException {

        constructor(response: Response) {
            super(response);
        }

}