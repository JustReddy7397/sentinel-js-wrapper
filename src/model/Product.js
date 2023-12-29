"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(name, defaultMaxServers, defaultMaxIps, autoCreateLicenses) {
        this.name = name;
        this.defaultMaxServers = defaultMaxServers;
        this.defaultMaxIps = defaultMaxIps;
        this.autoCreateLicenses = autoCreateLicenses;
    }
    get getName() {
        return this.name;
    }
    get getDefaultMaxServers() {
        return this.defaultMaxServers;
    }
    get getDefaultMaxIps() {
        return this.defaultMaxIps;
    }
    get isAutoCreateLicenses() {
        return this.autoCreateLicenses;
    }
}
exports.default = Product;
