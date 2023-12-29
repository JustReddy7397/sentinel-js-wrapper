import ApiException from "./ApiException";
import Response from "../http/Response";

export default class ExcessiveIpsException extends ApiException {

    private readonly maxIps: number

    constructor(response: Response) {
        super(response);
        this.maxIps = response.getResult("maxIps", Number) as number;
    }

    get getMaxIps(): number {
        return this.maxIps;
    }


}