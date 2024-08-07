"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Page {
    constructor(content, pageIndex, pageSize, totalPages, totalElements) {
        this.content = content;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }
    static fromJson(theClass, json) {
        const content = [];
        const jsonCopy = Object.assign({}, json);
        const pageJson = jsonCopy["page"];
        const contentJson = pageJson["content"];
        for (const contentElement of contentJson) {
            const jsonCopy = Object.assign({}, contentElement);
            const stringyifiedJson = JSON.stringify(jsonCopy);
            content.push(JSON.parse(stringyifiedJson));
        }
        return new Page(content, pageJson["number"], pageJson["size"], pageJson["totalPages"], pageJson["totalElements"]);
    }
}
exports.default = Page;
