"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("./Controller"));
const RequestBuilder_1 = __importDefault(require("../http/RequestBuilder"));
const QueryBuilder_1 = __importDefault(require("../util/QueryBuilder"));
const UnAuthorizedException_1 = __importDefault(require("../exception/unchecked/UnAuthorizedException"));
const InvalidPlatformException_1 = __importDefault(require("../exception/InvalidPlatformException"));
const InvalidLicenseException_1 = __importDefault(require("../exception/InvalidLicenseException"));
const InvalidProductException_1 = __importDefault(require("../exception/InvalidProductException"));
const BlacklistedLicenseException_1 = __importDefault(require("../exception/BlacklistedLicenseException"));
const ExpiredLicenseException_1 = __importDefault(require("../exception/ExpiredLicenseException"));
const ConnectionMismatchException_1 = __importDefault(require("../exception/ConnectionMismatchException"));
const ExcessiveServersException_1 = __importDefault(require("../exception/ExcessiveServersException"));
const ExcessiveIpsException_1 = __importDefault(require("../exception/ExcessiveIpsException"));
const UnexpectedResponseException_1 = __importDefault(require("../exception/unchecked/UnexpectedResponseException"));
const License_1 = __importDefault(require("../model/License"));
const NoResultsException_1 = __importDefault(require("../exception/NoResultsException"));
const HttpMethod_1 = require("../http/HttpMethod");
const KeyAlreadyExistsException_1 = __importDefault(require("../exception/KeyAlreadyExistsException"));
const ConnectionAlreadyExistsException_1 = __importDefault(require("../exception/ConnectionAlreadyExistsException"));
const moment_1 = __importDefault(require("moment/moment"));
const Page_1 = __importDefault(require("../model/Page"));
class LicenseController extends Controller_1.default {
    constructor(baseUrl, apiKey) {
        super(baseUrl + "/licenses", apiKey);
    }
    auth(key, product, connectionPlatform, connectionValue, server, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (new RequestBuilder_1.default().setApiKey(this.apiKey || "")
                .setQuery((new QueryBuilder_1.default(this.baseUrl + "/auth")
                .append("key", key)
                .append("product", product)
                .append("connectionPlatform", connectionPlatform)
                .append("connectionValue", connectionValue)
                .append("server", server)
                .append("ip", ip)
                .build()))).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return;
                case "UNAUTHORIZED":
                    throw new UnAuthorizedException_1.default(response);
                case "INVALID_PRODUCT":
                    throw new InvalidProductException_1.default(response);
                case "INVALID_PLATFORM":
                    throw new InvalidPlatformException_1.default(response);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                case "EXPIRED_LICENSE":
                    throw new ExpiredLicenseException_1.default(response);
                case "BLACKLISTED_LICENSE":
                    throw new BlacklistedLicenseException_1.default(response);
                case "CONNECTION_MISMATCH":
                    throw new ConnectionMismatchException_1.default(response);
                case "EXCESSIVE_SERVERS":
                    throw new ExcessiveServersException_1.default(response);
                case "EXCESSIVE_IPS":
                    throw new ExcessiveIpsException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    search(product, platform, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/search")
                .append("product", product)
                .append("platform", platform)
                .append("value", value)
                .build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "UNAUTHORIZED":
                    throw new UnAuthorizedException_1.default(response);
                case "NO_RESULTS":
                    throw new NoResultsException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    searchAll(platform, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/search")
                .append("platform", platform)
                .append("value", value)
                .build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("licenses", License_1.default);
                case "UNAUTHORIZED":
                    throw new UnAuthorizedException_1.default(response);
                case "NO_RESULTS":
                    throw new NoResultsException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringedDate = (0, moment_1.default)(data.getExpiration).format("YYYY-MM-DDTHH:mm:ss.SSS");
            const newData = {
                key: data.getKey,
                product: data.getProduct,
                expiration: stringedDate,
                maxServers: data.getMaxServers,
                maxIps: data.getMaxIps,
                note: data.getNote,
                connections: data.getConnections
            };
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.POST)
                .setQuery(new QueryBuilder_1.default(this.baseUrl)
                .build())
                .setBody(newData)
                .build().getResponse();
            console.log(response);
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "UNAUTHORIZED":
                    throw new UnAuthorizedException_1.default(response);
                case "INVALID_PRODUCT":
                    throw new InvalidProductException_1.default(response);
                case "INVALID_PLATFORM":
                    throw new InvalidPlatformException_1.default(response);
                case "KEY_ALREADY_EXISTS":
                    throw new KeyAlreadyExistsException_1.default(response);
                case "CONNECTION_ALREADY_EXISTS":
                    throw new ConnectionAlreadyExistsException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key)
                .build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "UNAUTHORIZED":
                    throw new UnAuthorizedException_1.default(response);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.DELETE)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key)
                .build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return;
                case "UNAUTHORIZED":
                    throw new UnAuthorizedException_1.default(response);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    update(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringedDate = (0, moment_1.default)(data.getExpiration).format("YYYY-MM-DDTHH:mm:ss.SSS");
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
            };
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.PATCH)
                .setBody(newData)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key)
                .build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                case "INVALID_PRODUCT":
                    throw new InvalidProductException_1.default(response);
                case "INVALID_PLATFORM":
                    throw new InvalidPlatformException_1.default(response);
                case "CONNECTION_ALREADY_EXISTS":
                    throw new ConnectionAlreadyExistsException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    updateConnections(key, connections) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.PUT)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key + "/connections")
                .build())
                .setBody({ connections })
                .build()
                .getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                case "INVALID_PLATFORM":
                    throw new InvalidPlatformException_1.default(response);
                case "CONNECTION_ALREADY_EXISTS":
                    throw new ConnectionAlreadyExistsException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    deleteConnection(key, platform) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new QueryBuilder_1.default(this.baseUrl + "/" + key + "/connections");
            for (let i = 0; i < platform.length; i++) {
                builder.append("platform", platform[i]);
            }
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.DELETE)
                .setQuery(builder.build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    updateBlacklist(key, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.PUT)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key + "/blacklist")
                .append("reason", reason)
                .build())
                .build()
                .getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    deleteBlacklist(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.DELETE)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key + "/blacklist")
                .build())
                .build()
                .getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    updateServers(key, servers) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.PUT)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key + "/servers")
                .build())
                .setBody({ servers })
                .build()
                .getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    deleteServers(key, servers) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new QueryBuilder_1.default(this.baseUrl + "/" + key + "/servers");
            for (let i = 0; i < servers.length; i++) {
                builder.append("servers", servers[i]);
            }
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.DELETE)
                .setQuery(builder.build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    updateIps(key, ips) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.PUT)
                .setQuery(new QueryBuilder_1.default(this.baseUrl + "/" + key + "/ips")
                .build())
                .setBody({ ips })
                .build()
                .getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    deleteIps(key, ips) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new QueryBuilder_1.default(this.baseUrl + "/" + key + "/ips");
            for (let i = 0; i < ips.length; i++) {
                builder.append("ips", ips[i]);
            }
            const response = yield new RequestBuilder_1.default()
                .setApiKey(this.apiKey || "")
                .setMethod(HttpMethod_1.HttpMethod.DELETE)
                .setQuery(builder.build()).build().getResponse();
            switch (response === null || response === void 0 ? void 0 : response.getType) {
                case "SUCCESS":
                    return response.getResult("license", License_1.default);
                case "INVALID_LICENSE":
                    throw new InvalidLicenseException_1.default(response);
                default:
                    throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            return "hello";
        });
    }
    list(product, pageIndex, elementsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new QueryBuilder_1.default(this.baseUrl + "/list")
                .append("product", product)
                .append("page", pageIndex.toString())
                .append("size", elementsPerPage.toString());
            const response = yield new RequestBuilder_1.default()
                .setMethod(HttpMethod_1.HttpMethod.GET)
                .setApiKey(this.apiKey || "")
                .setQuery(builder.build())
                .build()
                .getResponse();
            if ((response === null || response === void 0 ? void 0 : response.getType) === "SUCCESS") {
                return Page_1.default.fromJson(License_1.default, response.getResultString);
            }
            throw new UnexpectedResponseException_1.default(response);
        });
    }
}
exports.default = LicenseController;
