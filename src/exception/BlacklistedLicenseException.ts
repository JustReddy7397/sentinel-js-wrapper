import Response from "../http/Response";
import ApiException from "./ApiException";
import Blacklist from "../model/Blacklist";

export default class BlacklistedLicenseException extends ApiException {

    private readonly blacklist: Blacklist

    constructor(response: Response) {
        super(response);
        this.blacklist = response.getResult("blacklist", Blacklist) as Blacklist;
    }

    get getBlacklist(): Blacklist {
        return this.blacklist;
    }

}