import ApiException from "./ApiException";
import Response from "../http/Response";

export default class InvalidPlatformException extends ApiException {

    private readonly platform: string | null

    constructor(response: Response) {
        super(response);
        this.platform = response.getResult("platform", String) as string | null;
    }

    get getPlatform(): string | null {
        return this.platform;
    }


}