
export default abstract class Controller {

    protected readonly baseUrl: string;
    protected readonly apiKey: string | null;

    protected constructor(baseUrl: string, apiKey: string | null) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

}