"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class License {
    get getKey() {
        return this.key;
    }
    get getProduct() {
        return this.product;
    }
    get getIssuer() {
        return this.issuer;
    }
    get getCreatedAt() {
        return this.createdAt;
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
    get getBlackList() {
        return this.blackList;
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
    set setProduct(value) {
        this.product = value;
    }
    set setExpiration(value) {
        this.expiration = value;
    }
    set setMaxServers(value) {
        this.maxServers = value;
    }
    set setMaxIps(value) {
        this.maxIps = value;
    }
    set setBlackList(value) {
        this.blackList = value;
    }
    set setNote(value) {
        this.note = value;
    }
    set setConnections(value) {
        this.connections = value;
    }
    set setServers(value) {
        this.servers = value;
    }
    set setIps(value) {
        this.ips = value;
    }
    constructor(key, product, issuer, createdAt, expiration, maxServers, maxIps, blackList, note, connections, servers, ips) {
        this.key = key;
        this.product = product;
        this.issuer = issuer;
        this.createdAt = createdAt;
        this.expiration = expiration;
        this.maxServers = maxServers;
        this.maxIps = maxIps;
        this.blackList = blackList;
        this.note = note;
        this.connections = connections;
        this.servers = servers;
        this.ips = ips;
    }
}
exports.default = License;
