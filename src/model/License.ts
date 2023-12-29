import Product from "./Product";
import Blacklist from "./Blacklist";

export default class License {

    private readonly key: string;
    private product: Product;
    private readonly issuer: string
    private readonly createdAt: number
    private expiration: number
    private maxServers: number;
    private maxIps: number
    private blackList: Blacklist
    private note: string;
    private connections: Map<string ,string>
    private servers: Map<string, number>
    private ips: Map<string, number>

    get getKey(): string {
        return this.key;
    }

    get getProduct(): Product {
        return this.product;
    }

    get getIssuer(): string {
        return this.issuer;
    }

    get getCreatedAt(): number {
        return this.createdAt;
    }

    get getExpiration(): number {
        return this.expiration;
    }

    get getMaxServers(): number {
        return this.maxServers;
    }

    get getMaxIps(): number {
        return this.maxIps;
    }

    get getBlackList(): Blacklist {
        return this.blackList;
    }

    get getNote(): string {
        return this.note;
    }

    get getConnections(): Map<string, string> {
        return this.connections;
    }

    get getServers(): Map<string, number> {
        return this.servers;
    }

    get getIps(): Map<string, number> {
        return this.ips;
    }

    set setProduct(value: Product) {
        this.product = value;
    }

    set setExpiration(value: number) {
        this.expiration = value;
    }

    set setMaxServers(value: number) {
        this.maxServers = value;
    }

    set setMaxIps(value: number) {
        this.maxIps = value;
    }

    set setBlackList(value: Blacklist) {
        this.blackList = value;
    }

    set setNote(value: string) {
        this.note = value;
    }

    set setConnections(value: Map<string, string>) {
        this.connections = value;
    }

    set setServers(value: Map<string, number>) {
        this.servers = value;
    }

    set setIps(value: Map<string, number>) {
        this.ips = value;
    }

    constructor(key: string, product: Product, issuer: string, createdAt: number, expiration: number, maxServers: number, maxIps: number, blackList: Blacklist, note: string, connections: Map<string, string>, servers: Map<string, number>, ips: Map<string, number>) {
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