import * as crypto from 'crypto-js'
import {Buffer} from "node:buffer";

export default class ResponseDecrypter {

    private readonly charset = "UTF-8";
    private readonly algorithm = "AES";
    private readonly transformation = "AES/CBC/NoPadding";
    private readonly tagLength = 128;
    private readonly ivLength = 12;

    private readonly secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    decrypt(encrypted: string) : string {
        return crypto.AES.decrypt(encrypted, this.secretKey).toString(crypto.enc.Utf8)
    }



}