
export default class LicenseCreateData {

    private readonly key?: string
    private readonly product: string
    private readonly expiration?: number
    private readonly maxServers?: number
    private readonly maxIps?: number
    private readonly note?: string
    private readonly connections?: Map<string, string>

    static builder(): LicenseCreateDataBuilder {
        return new LicenseCreateDataBuilder();
    }

    get getKey(): string | undefined {
        return this.key;
    }

    get getProduct(): string {
        return this.product;
    }

    get getExpiration(): number | undefined {
        return this.expiration;
    }

    get getMaxServers(): number | undefined {
        return this.maxServers;
    }

    get getMaxIps(): number | undefined {
        return this.maxIps;
    }

    get getNote(): string | undefined {
        return this.note;
    }

    get getConnections(): Map<string, string> | undefined {
        return this.connections;
    }

    constructor(key: string, product: string, expiration: number, maxServers: number, maxIps: number, note: string, connections: Map<string, string>) {
        this.key = key;
        this.product = product;
        this.expiration = expiration;
        this.maxServers = maxServers;
        this.maxIps = maxIps;
        this.note = note;
        this.connections = connections;
    }



}

class LicenseCreateDataBuilder {

    private key: string
    private product: string
    private expiration: number
    private maxServers: number
    private maxIps: number
    private note: string
    private connections: Map<string, string>

    set setKey(key: string) {
        this.key = key;
    }

    set setProduct(product: string) {
        this.product = product;
    }

    set setExpiration(expiration: number) {
        this.expiration = expiration;
    }

    set setMaxServers(maxServers: number) {
        this.maxServers = maxServers;
    }

    set setMaxIps(maxIps: number) {
        this.maxIps = maxIps;
    }

    set setNote(note: string) {
        this.note = note;
    }

    addConnection(key: string, value: string) {
        if (this.connections == null) {
            this.connections = new Map<string, string>();
        }
        this.connections.set(key, value);
    }

    build(): LicenseCreateData {
        if (this.product == null) throw new Error("Product cannot be null");
        return new LicenseCreateData(this.key, this.product, this.expiration, this.maxServers, this.maxIps, this.note, this.connections);
    }


}