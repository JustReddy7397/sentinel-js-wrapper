import Response from "../http/Response";
export default class ApiException extends Error {

    private readonly response: Response

    constructor(response: Response) {
        super(`${response.getStatus} - ${response.getType}: ${response.getMessage}`);
        this.response = response;
    }

    get getResponse(): Response {
        return this.response;
    }

}