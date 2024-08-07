"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class ResponseDecrypter {
    constructor(secretKey) {
        this.charset = "UTF-8";
        this.algorithm = "AES";
        this.transformation = "AES/CBC/NoPadding";
        this.tagLength = 128;
        this.ivLength = 12;
        this.secretKey = secretKey;
    }
    decrypt(encrypted) {
        const encryptedBuffer = Buffer.from(encrypted, 'base64');
        const key = Buffer.from(this.secretKey, 'base64');
        const iv = encryptedBuffer.subarray(0, 12);
        const content = encryptedBuffer.subarray(12);
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        let decrypted = decipher.update(content);
        let final = decrypted.toString('utf8');
        final = final.substring(0, final.lastIndexOf("}") + 1);
        return final;
    }
}
exports.default = ResponseDecrypter;
