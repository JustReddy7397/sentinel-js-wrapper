import PlatformController from "./controller/PlatformController";
import ProductController from "./controller/ProductController";
import LicenseController from "./controller/LicenseController";
import Hwid from "./util/Hwid";
import axios from "axios";

export default class SentinelClient {

    private readonly platformController: PlatformController;
    private readonly productController: ProductController;
    private readonly licenseController: LicenseController;

    constructor(
        private readonly baseUrl: string,
        private readonly apiKey: string,
        private readonly secretKey?: string,
    ) {
        if (secretKey) {
            // TODO
        }

        this.platformController = new PlatformController(baseUrl);
        this.productController = new ProductController(baseUrl);
        this.licenseController = new LicenseController(baseUrl, apiKey);
    }

    get platform(): PlatformController {
        return this.platformController;
    }

    get product(): ProductController {
        return this.productController;
    }

    get license(): LicenseController {
        return this.licenseController;
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    static async getCurrentHwid(): Promise<string> {
        return await Hwid.getHwid();
    }

    static async getCurrentIp(): Promise<string | null> {
        try {
            const reader = await axios.get<string>("http://checkip.amazonaws.com")
            try {
                return reader.data
            } catch (err) {
                console.log(err)
            } finally {
                reader.request.close()
            }

        } catch (err) {
            return null
        }
        return null
    }


}