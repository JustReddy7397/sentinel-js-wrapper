"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LicenseCreateData {
    static builder() {
        return new LicenseCreateDataBuilder();
    }
    get getKey() {
        return this.key;
    }
    get getProduct() {
        return this.product;
    }
    get getExpiration() {
        return this.expiration;
    }
    get getMaxServers() {
        return this.maxServers;
    }
    get getMaxIps() {
        return this.maxIps;
    }
    get getNote() {
        return this.note;
    }
    get getConnections() {
        return this.connections;
    }
    constructor(key, product, expiration, maxServers, maxIps, note, connections) {
        this.key = key;
        this.product = product;
        this.expiration = expiration;
        this.maxServers = maxServers;
        this.maxIps = maxIps;
        this.note = note;
        this.connections = connections;
    }
}
exports.default = LicenseCreateData;
class LicenseCreateDataBuilder {
    set setKey(key) {
        this.key = key;
    }
    set setProduct(product) {
        this.product = product;
    }
    set setExpiration(expiration) {
        this.expiration = expiration;
    }
    set setMaxServers(maxServers) {
        this.maxServers = maxServers;
    }
    set setMaxIps(maxIps) {
        this.maxIps = maxIps;
    }
    set setNote(note) {
        this.note = note;
    }
    addConnection(key, value) {
        if (this.connections == null) {
            this.connections = new Map();
        }
        this.connections.set(key, value);
    }
    build() {
        if (this.product == null)
            throw new Error("Product cannot be null");
        return new LicenseCreateData(this.key, this.product, this.expiration, this.maxServers, this.maxIps, this.note, this.connections);
    }
}
