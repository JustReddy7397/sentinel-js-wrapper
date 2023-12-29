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
exports.linuxHWID = void 0;
const exec_1 = require("./exec");
const linuxHWID = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout } = yield (0, exec_1.exec)('cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || true');
    const array = stdout.trim().split('\n');
    const first = array[0];
    if (!first)
        throw new Error('failed to find hwid');
    return first;
});
exports.linuxHWID = linuxHWID;
