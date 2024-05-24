
import { fromJson } from "../json/gson";

export default class Page<T>  {

    public readonly content: T[]
    public readonly pageIndex: number;
    public readonly pageSize: number;
    public readonly totalPages: number;
    public readonly totalElements: number;

    constructor(content: T[], pageIndex: number, pageSize: number, totalPages: number, totalElements: number) {
        this.content = content;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }

    static fromJson<T>(theClass: { new(...args: any[]): T }, json: any) : Page<T> {
        const content = [] as T[];

        const jsonCopy = Object.assign({}, json);

        const pageJson = jsonCopy["page"] as any;
        const contentJson = pageJson["content"] as any[];


        for (const contentElement of contentJson) {
            const jsonCopy = Object.assign({}, contentElement);
            const stringyifiedJson = JSON.stringify(jsonCopy);
            content.push(fromJson(theClass, JSON.parse(stringyifiedJson)));
        }

        return new Page<T>(
            content,
            pageJson["number"] as number,
            pageJson["size"] as number,
            pageJson["totalPages"] as number,
            pageJson["totalElements"] as number
        )
    }



}