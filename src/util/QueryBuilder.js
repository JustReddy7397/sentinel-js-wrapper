"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(baseUrl) {
        this.query = "";
        this.baseUrl = baseUrl;
    }
    append(key, value) {
        if (key != null && value != null) {
            if (this.query.length == 0) {
                this.query += "&";
            }
            this.query += key + "=" + value + "&";
            return this;
        }
        return this;
    }
    build() {
        return this.query.length == 0 ? this.baseUrl : this.baseUrl + "?" + this.query;
    }
}
exports.default = QueryBuilder;
