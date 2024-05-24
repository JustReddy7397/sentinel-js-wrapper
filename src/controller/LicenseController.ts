import Controller from "./Controller";
import RequestBuilder from "../http/RequestBuilder";
import QueryBuilder from "../util/QueryBuilder";
import UnAuthorizedException from "../exception/unchecked/UnAuthorizedException";
import InvalidPlatformException from "../exception/InvalidPlatformException";
import InvalidLicenseException from "../exception/InvalidLicenseException";
import InvalidProductException from "../exception/InvalidProductException";
import BlacklistedLicenseException from "../exception/BlacklistedLicenseException";
import ExpiredLicenseException from "../exception/ExpiredLicenseException";
import ConnectionMismatchException from "../exception/ConnectionMismatchException";
import ExcessiveServersException from "../exception/ExcessiveServersException";
import ExcessiveIpsException from "../exception/ExcessiveIpsException";
import UnexpectedResponseException from "../exception/unchecked/UnexpectedResponseException";
import License from "../model/License";
import NoResultsException from "../exception/NoResultsException";
import LicenseCreateData from "../model/LicenseCreateData";
import {HttpMethod} from "../http/HttpMethod";
import KeyAlreadyExistsException from "../exception/KeyAlreadyExistsException";
import ConnectionAlreadyExistsException from "../exception/ConnectionAlreadyExistsException";
import LicensePatchData from "../model/LicensePatchData";
import moment from "moment/moment";
import Page from "../model/Page";

export default class LicenseController extends Controller {

    constructor(baseUrl: string, apiKey: string) {
        super(baseUrl + "/licenses", apiKey);
    }

    async auth(key: string, product: string, connectionPlatform: string | null, connectionValue: string | null, server: string, ip: string) {
        const response = await (new RequestBuilder().setApiKey(this.apiKey || "")
            .setQuery(
                (new QueryBuilder(this.baseUrl + "/auth")
                        .append("key", key)
                        .append("product", product)
                        .append("connectionPlatform", connectionPlatform)
                        .append("connectionValue", connectionValue)
                        .append("server", server)
                        .append("ip", ip)
                        .build()
                )
            )).build().getResponse();

        switch (response?.getType) {
            case "SUCCESS":
                return
            case "UNAUTHORIZED":
                throw new UnAuthorizedException(response);
            case "INVALID_PRODUCT":
                throw new InvalidProductException(response);
            case "INVALID_PLATFORM":
                throw new InvalidPlatformException(response);
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            case "EXPIRED_LICENSE":
                throw new ExpiredLicenseException(response);
            case "BLACKLISTED_LICENSE":
                throw new BlacklistedLicenseException(response);
            case "CONNECTION_MISMATCH":
                throw new ConnectionMismatchException(response);
            case "EXCESSIVE_SERVERS":
                throw new ExcessiveServersException(response);
            case "EXCESSIVE_IPS":
                throw new ExcessiveIpsException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async search(product: string, platform: string, value: string) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setQuery(
                new QueryBuilder(this.baseUrl + "/search")
                    .append("product", product)
                    .append("platform", platform)
                    .append("value", value)
                    .build()
            ).build().getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "UNAUTHORIZED":
                throw new UnAuthorizedException(response);
            case "NO_RESULTS":
                throw new NoResultsException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async searchAll(platform: string, value: string) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setQuery(
                new QueryBuilder(this.baseUrl + "/search")
                    .append("platform", platform)
                    .append("value", value)
                    .build()
            ).build().getResponse();

        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("licenses", License) as unknown as License[]
            case "UNAUTHORIZED":
                throw new UnAuthorizedException(response);
            case "NO_RESULTS":
                throw new NoResultsException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async create(data: LicenseCreateData) {
        const stringedDate = moment(data.getExpiration).format("YYYY-MM-DDTHH:mm:ss.SSS")
        const newData = {
            key: data.getKey,
            product: data.getProduct,
            expiration: stringedDate,
            maxServers: data.getMaxServers,
            maxIps: data.getMaxIps,
            note: data.getNote,
            connections: data.getConnections
        }
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.POST)
            .setQuery(
                new QueryBuilder(this.baseUrl)
                    .build()
            )
            .setBody(newData)
            .build().getResponse();
        console.log(response)
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "UNAUTHORIZED":
                throw new UnAuthorizedException(response);
            case "INVALID_PRODUCT":
                throw new InvalidProductException(response);
            case "INVALID_PLATFORM":
                throw new InvalidPlatformException(response);
            case "KEY_ALREADY_EXISTS":
                throw new KeyAlreadyExistsException(response);
            case "CONNECTION_ALREADY_EXISTS":
                throw new ConnectionAlreadyExistsException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async get(key: string) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key)
                    .build()
            ).build().getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "UNAUTHORIZED":
                throw new UnAuthorizedException(response);
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async delete(key: string) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.DELETE)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key)
                    .build()
            ).build().getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return
            case "UNAUTHORIZED":
                throw new UnAuthorizedException(response);
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async update(key: string, data: LicensePatchData) {
        const stringedDate = moment(data.getExpiration).format("YYYY-MM-DDTHH:mm:ss.SSS")
        const newData = {
            product: data.getProduct,
            expiration: stringedDate,
            maxServers: data.getMaxServers,
            maxIps: data.getMaxIps,
            blacklistReason: data.getBlacklistReason,
            note: data.getNote,
            connections: data.getConnections,
            servers: data.getServers,
            ips: data.getIps
        }

        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.PATCH)
            .setBody(newData)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key)
                    .build()
            ).build().getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            case "INVALID_PRODUCT":
                throw new InvalidProductException(response);
            case "INVALID_PLATFORM":
                throw new InvalidPlatformException(response);
            case "CONNECTION_ALREADY_EXISTS":
                throw new ConnectionAlreadyExistsException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async updateConnections(key: string, connections: { platform: string, value: string }[]) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.PUT)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key + "/connections")
                    .build()
            )
            .setBody({connections})
            .build()
            .getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            case "INVALID_PLATFORM":
                throw new InvalidPlatformException(response);
            case "CONNECTION_ALREADY_EXISTS":
                throw new ConnectionAlreadyExistsException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async deleteConnection(key: string, platform: string[]) {
        const builder = new QueryBuilder(this.baseUrl + "/" + key + "/connections");

        for (let i = 0; i < platform.length; i++) {
            builder.append("platform", platform[i]);
        }

        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.DELETE)
            .setQuery(builder.build()).build().getResponse()

        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async updateBlacklist(key: string, reason: string) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.PUT)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key + "/blacklist")
                    .append("reason", reason)
                    .build()
            )
            .build()
            .getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async deleteBlacklist(key: string) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.DELETE)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key + "/blacklist")
                    .build()
            )
            .build()
            .getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async updateServers(key: string, servers: string[]) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.PUT)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key + "/servers")
                    .build()
            )
            .setBody({servers})
            .build()
            .getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async deleteServers(key: string, servers: string[]) {
        const builder = new QueryBuilder(this.baseUrl + "/" + key + "/servers");

        for (let i = 0; i < servers.length; i++) {
            builder.append("servers", servers[i]);
        }

        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.DELETE)
            .setQuery(builder.build()).build().getResponse()

        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async updateIps(key: string, ips: string[]) {
        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.PUT)
            .setQuery(
                new QueryBuilder(this.baseUrl + "/" + key + "/ips")
                    .build()
            )
            .setBody({ips})
            .build()
            .getResponse();
        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }

    async deleteIps(key: string, ips: string[]) {
        const builder = new QueryBuilder(this.baseUrl + "/" + key + "/ips");

        for (let i = 0; i < ips.length; i++) {
            builder.append("ips", ips[i]);
        }

        const response = await new RequestBuilder()
            .setApiKey(this.apiKey || "")
            .setMethod(HttpMethod.DELETE)
            .setQuery(builder.build()).build().getResponse()

        switch (response?.getType) {
            case "SUCCESS":
                return response.getResult("license", License) as License;
            case "INVALID_LICENSE":
                throw new InvalidLicenseException(response);
            default:
                throw new UnexpectedResponseException(response);
        }
    }


    async test() {
        return "hello"
    }
    async list(product: string, pageIndex: number, elementsPerPage: number) {
        const builder = new QueryBuilder(this.baseUrl + "/list")
            .append("product", product)
            .append("page", pageIndex.toString())
            .append("size", elementsPerPage.toString());

        const response = await new RequestBuilder()
            .setMethod(HttpMethod.GET)
            .setApiKey(this.apiKey || "")
            .setQuery(builder.build())
            .build()
            .getResponse();

        if (response?.getType ===  "SUCCESS") {
            return Page.fromJson(License, response.getResultString);
        }

        throw new UnexpectedResponseException(response);

    }

}