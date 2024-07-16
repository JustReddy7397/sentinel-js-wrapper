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
const PlatformController_1 = __importDefault(require("./controller/PlatformController"));
const ProductController_1 = __importDefault(require("./controller/ProductController"));
const LicenseController_1 = __importDefault(require("./controller/LicenseController"));
const Hwid_1 = __importDefault(require("./util/Hwid"));
const Request_1 = __importDefault(require("./http/Request"));
const axios_1 = __importDefault(require("axios"));
const ResponseDecrypter_1 = __importDefault(require("./http/ResponseDecrypter"));
class SentinelClient {
    constructor(baseUrl, apiKey, secretKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        if (secretKey) {
            Request_1.default.setDecrypter(new ResponseDecrypter_1.default(secretKey));
        }
        this.platformController = new PlatformController_1.default(baseUrl);
        this.productController = new ProductController_1.default(baseUrl);
        this.licenseController = new LicenseController_1.default(baseUrl, apiKey);
    }
    get platform() {
        return this.platformController;
    }
    get product() {
        return this.productController;
    }
    get license() {
        return this.licenseController;
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    static getCurrentHwid() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Hwid_1.default.getHwid();
        });
    }
    static getCurrentIp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reader = yield axios_1.default.get("http://checkip.amazonaws.com");
                try {
                    return reader.data;
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    reader.request.close();
                }
            }
            catch (err) {
                return null;
            }
            return null;
        });
    }
}
exports.default = SentinelClient;
