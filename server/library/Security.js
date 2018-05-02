const crypto=require('crypto');
const encryptionSeed = '1e17b449-ceda-4514-919e-d39a615d2660';


exports.encrypt = function (text) {
    var algorithm = 'aes256';
    var cipher = crypto.createCipher(algorithm, encryptionSeed);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

exports.decrypt = function (text) {
    var algorithm = 'aes256';
    var cipher = crypto.createCipher(algorithm, encryptionSeed);
    return cipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}