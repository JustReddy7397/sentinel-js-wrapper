import Response from "../../http/Response";


export default class UncheckedApiException extends Error {

    private readonly response: Response | null

    constructor(response: Response | null) {
        super(`${response?.getStatus} - ${response?.getType}: ${response?.getMessage}`);
        this.response = response;
    }

    get getResponse(): Response | null{
        return this.response;
    }

}