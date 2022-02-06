const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = 262335;
// const iv = crypto.randomBytes(16);

encrypt = (text) => {
    // let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    // let encrypted = cipher.update(text);
    // encrypted = Buffer.concat([encrypted, cipher.final()]);
    // // return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    // return encrypted.toString('hex');

    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return mystr
}

decrypt = (text) => {
    // // let iv = Buffer.from(text.iv, 'hex');
    // let encryptedText = Buffer.from(text, 'hex');
    // let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    // let decrypted = decipher.update(encryptedText);
    // decrypted = Buffer.concat([decrypted, decipher.final()]);
    // return decrypted.toString();

    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(text, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr
}

compare = (text) => {
    var hmac = crypto.createHmac('aes-128-cbc', 'mypassword');
    return hmac.update(text).digest('hex');
}

const Crypto = {
    encrypt,
    decrypt,
    compare
};

module.exports = Crypto;