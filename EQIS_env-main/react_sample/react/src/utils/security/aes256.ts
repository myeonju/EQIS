import cryptoJs from 'crypto-js';

export const htmlDecrypt = (encryptedText: string) => {
    if (!encryptedText) {
        return '';
    }

    const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(process.env.HTML_AES_SECRETKEY), {
        iv: cryptoJs.enc.Utf8.parse(''),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    });

    return decipher.toString(cryptoJs.enc.Utf8);
};
