"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LicensePatchData {
    static builder() {
        return new LicensePatchDataBuilder();
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
    get getBlacklistReason() {
        return this.blacklistReason;
    }
    get getNote() {
        return this.note;
    }
    get getConnections() {
        return this.connections;
    }
    get getServers() {
        return this.servers;
    }
    get getIps() {
        return this.ips;
    }
    constructor(product, expiration, maxServers, maxIps, blacklistReason, note, connections, servers, ips) {
        this.product = product;
        this.expiration = expiration;
        this.maxServers = maxServers;
        this.maxIps = maxIps;
        this.blacklistReason = blacklistReason;
        this.note = note;
        this.connections = connections;
        this.servers = servers;
        this.ips = ips;
    }
}
exports.default = LicensePatchData;
class LicensePatchDataBuilder {
    setProduct(product) {
        this.product = product;
        return this;
    }
    setExpiration(expiration) {
        this.expiration = expiration;
        return this;
    }
    setMaxServers(maxServers) {
        this.maxServers = maxServers;
        return this;
    }
    setMaxIps(maxIps) {
        this.maxIps = maxIps;
        return this;
    }
    setBlacklistReason(blacklistReason) {
        this.blacklistReason = blacklistReason;
        return this;
    }
    setNote(note) {
        this.note = note;
        return this;
    }
    setConnections(connections) {
        this.connections = connections;
        return this;
    }
    setServers(servers) {
        this.servers = servers;
        return this;
    }
    setIps(ips) {
        this.ips = ips;
        return this;
    }
    build() {
        return new LicensePatchData(this.product, this.expiration, this.maxServers, this.maxIps, this.blacklistReason, this.note, this.connections, this.servers, this.ips);
    }
}
