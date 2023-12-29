"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveID = void 0;
const node_process_1 = require("node:process");
const linux_1 = require("./linux");
const win32_1 = require("./win32");
const resolveID = () => __awaiter(void 0, void 0, void 0, function* () {
    switch (node_process_1.platform) {
        case "win32":
            return (0, win32_1.win32HWID)();
        case 'linux':
            return (0, linux_1.linuxHWID)();
        default:
            throw new Error('unsupported platform');
    }
});
exports.resolveID = resolveID;
