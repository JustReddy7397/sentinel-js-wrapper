"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["PATCH"] = 3] = "PATCH";
    HttpMethod[HttpMethod["DELETE"] = 4] = "DELETE";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
