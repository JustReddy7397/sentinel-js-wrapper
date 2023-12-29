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
exports.getHWID = void 0;
const resolve_1 = require("./resolve");
const getHWID = () => __awaiter(void 0, void 0, void 0, function* () {
    const hwid = yield (0, resolve_1.resolveID)();
    if (hwid === '')
        throw new Error('failed to find hwid');
    return hwid;
});
exports.getHWID = getHWID;
