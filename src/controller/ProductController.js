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
const Product_1 = __importDefault(require("../model/Product"));
const RequestBuilder_1 = __importDefault(require("../http/RequestBuilder"));
const QueryBuilder_1 = __importDefault(require("../util/QueryBuilder"));
const UnexpectedResponseException_1 = __importDefault(require("../exception/unchecked/UnexpectedResponseException"));
class ProductController extends Controller_1.default {
    constructor(baseUrl) {
        super(baseUrl + "/products", null);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new RequestBuilder_1.default()
                .setQuery(new QueryBuilder_1.default(this.baseUrl).build())
                .build()
                .getResponse();
            if ((response === null || response === void 0 ? void 0 : response.getType) === "SUCCESS") {
                return response.getResult("products", Product_1.default);
            }
            else {
                throw new UnexpectedResponseException_1.default(response);
            }
        });
    }
}
exports.default = ProductController;
