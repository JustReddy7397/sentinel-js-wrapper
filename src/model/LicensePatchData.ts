export default class LicensePatchData {

    private product: string
    private expiration: number
    private maxServers: number
    private maxIps: number
    private blacklistReason: string
    private note: string
    private connections: Map<string, string>
    private servers: Array<string>
    private ips: Array<string>

    static builder(): LicensePatchDataBuilder {
        return new LicensePatchDataBuilder();
    }

    get getProduct(): string {
        return this.product;
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

    get getBlacklistReason(): string {
        return this.blacklistReason;
    }

    get getNote(): string {
        return this.note;
    }

    get getConnections(): Map<string, string> {
        return this.connections;
    }

    get getServers(): Array<string> {
        return this.servers;
    }

    get getIps(): Array<string> {
        return this.ips;
    }

    constructor(product: string, expiration: number, maxServers: number, maxIps: number, blacklistReason: string, note: string, connections: Map<string, string>, servers: Array<string>, ips: Array<string>) {
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

class LicensePatchDataBuilder {

    private product: string
    private expiration: number
    private maxServers: number
    private maxIps: number
    private blacklistReason: string
    private note: string
    private connections: Map<string, string>
    private servers: Array<string>
    private ips: Array<string>

    setProduct(product: string): LicensePatchDataBuilder {
        this.product = product;
        return this;
    }

    setExpiration(expiration: number): LicensePatchDataBuilder {
        this.expiration = expiration;
        return this;
    }

    setMaxServers(maxServers: number): LicensePatchDataBuilder {
        this.maxServers = maxServers;
        return this;
    }

    setMaxIps(maxIps: number): LicensePatchDataBuilder {
        this.maxIps = maxIps;
        return this;
    }

    setBlacklistReason(blacklistReason: string): LicensePatchDataBuilder {
        this.blacklistReason = blacklistReason;
        return this;
    }

    setNote(note: string): LicensePatchDataBuilder {
        this.note = note;
        return this;
    }

    setConnections(connections: Map<string, string>): LicensePatchDataBuilder {
        this.connections = connections;
        return this;
    }

    setServers(servers: Array<string>): LicensePatchDataBuilder {
        this.servers = servers;
        return this;
    }

    setIps(ips: Array<string>): LicensePatchDataBuilder {
        this.ips = ips;
        return this;
    }

    build(): LicensePatchData {
        return new LicensePatchData(this.product, this.expiration, this.maxServers, this.maxIps, this.blacklistReason, this.note, this.connections, this.servers, this.ips);
    }

}