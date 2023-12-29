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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.win32HWID = void 0;
const node_util_1 = require("node:util");
const winreg_1 = __importDefault(require("winreg"));
const win32HWID = () => __awaiter(void 0, void 0, void 0, function* () {
    const regKey = new winreg_1.default({
        hive: winreg_1.default.HKLM,
        key: '\\SOFTWARE\\Microsoft\\Cryptography',
    });
    const getKey = (0, node_util_1.promisify)(regKey.get.bind(regKey));
    const key = yield getKey('MachineGuid');
    return key.value.toLowerCase();
});
exports.win32HWID = win32HWID;
