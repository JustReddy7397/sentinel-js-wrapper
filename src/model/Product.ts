
export default class Product {

    private readonly name: string
    private readonly defaultMaxServers: number
    private readonly defaultMaxIps: number
    private readonly autoCreateLicenses: boolean

    constructor(name: string, defaultMaxServers: number, defaultMaxIps: number, autoCreateLicenses: boolean) {
        this.name = name;
        this.defaultMaxServers = defaultMaxServers;
        this.defaultMaxIps = defaultMaxIps;
        this.autoCreateLicenses = autoCreateLicenses;
    }

    get getName(): string {
        return this.name;
    }

    get getDefaultMaxServers(): number {
        return this.defaultMaxServers;
    }

    get getDefaultMaxIps(): number {
        return this.defaultMaxIps;
    }

    get isAutoCreateLicenses(): boolean {
        return this.autoCreateLicenses;
    }

}