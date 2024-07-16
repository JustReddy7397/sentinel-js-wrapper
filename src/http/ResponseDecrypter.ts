import * as crypto from 'crypto';

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

    decrypt(encrypted: string): any {
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