import ApiException from "./ApiException";
import Response from "../http/Response";
export default class ConnectionAlreadyExistsException extends ApiException {

    private readonly connectionPlatform: string
    private readonly connectionValue: string

    constructor(response: Response) {
        super(response);
        const toStringJson = JSON.stringify(response.getResult("connection", Object));
        const json = JSON.parse(toStringJson);
        this.connectionPlatform = json["platform"];
        this.connectionValue = json["value"];
    }

    get getConnectionPlatform(): string {
        return this.connectionPlatform;
    }

    get getConnectionValue(): string {
        return this.connectionValue;
    }


}