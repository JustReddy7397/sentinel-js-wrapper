export default class QueryBuilder {

    private readonly baseUrl: string;
    private query: string = "";

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    append(key: string | null, value: string | null): QueryBuilder {
        if (key != null && value != null) {
            if (this.query.length == 0) {
                this.query += "&";
            }

            this.query += key + "=" + value + "&";
            return this
        }

        return this
    }

    build() : string {

        return this.query.length == 0 ? this.baseUrl : this.baseUrl + "?" + this.query
    }

}