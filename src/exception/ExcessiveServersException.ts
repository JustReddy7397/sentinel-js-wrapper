import ApiException from "./ApiException";
import Response from "../http/Response";

export default class ExcessiveServersException extends ApiException {

    private readonly maxServers: number

    constructor(response: Response) {
        super(response);
        this.maxServers = response.getResult("maxServers", Number) as number;
    }

    get getMaxServers(): number {
        return this.maxServers;
    }

}