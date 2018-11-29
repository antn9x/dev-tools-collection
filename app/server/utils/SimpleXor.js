const fs = require("fs");
const path = require("path");
const opts = require("nomnom").parse();

function concatTypedArrays(a, b) { // a, b TypedArray of same type
    const c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

function concatBuffers(a, b) {
    return concatTypedArrays(
        new Uint8Array(a.buffer || a),
        new Uint8Array(b.buffer || b)
    ).buffer;
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i += 1) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

const key = "a really long key".split(''); // Can be any chars, and any size array
function encryptDecrypt(input) {
    const output = [];

    for (let i = 0; i < input.length; i += 1) {
        const charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);// eslint-disable-line
        output.push(String.fromCharCode(charCode));
    }
    return output.join("");
}

function encryptDecryptBinaryXOR(input) {
    const output = Buffer.alloc(input.length);
    for (let i = 0; i < input.length; i += 1) {
        const charCode = input[i] ^ key[i % key.length].charCodeAt(0);// eslint-disable-line
        output[i] = ((charCode));
    }
    return output;
}

// var str = " test append string buffer\n TEST encrypt image"
// var ab = str2ab(str)
// var encrypted = concatBuffers(str2ab("data need to encrypt"), ab)
// encrypted = encryptDecrypt(ab2str(encrypted))
// console.log((encrypted))
// var decrypted = encryptDecrypt(encrypted)
// console.log((decrypted))
const choice = opts[0];
// console.log(choice)
const encryptedPNG = path.resolve(__dirname, "../dist/card.png");
const decryptedPNG = path.resolve(__dirname, "../dist/card.decrypted.png");

if (choice) {
    // Encrypt
    const filePath = path.resolve(__dirname, "../tmp/walking/0.png");
    const fileContent = fs.readFileSync(filePath);
    // console.log("Encrypt Open file :" + fileContent);
    const encryptedData = encryptDecryptBinaryXOR(fileContent);
    const stream = fs.createWriteStream(encryptedPNG);
    // console.log("Encrypted Open file :" + encryptedData);
    stream.write(encryptedData);
    stream.end();
    console.log(`Encrypted file ${filePath}`);
} else {
    // Decrypt
    const encryptedData = fs.readFileSync(encryptedPNG);
    // console.log("Decrypt Open encrypted file :" + encryptedData);
    const decryptedData = encryptDecryptBinaryXOR(encryptedData);
    console.log(`Decrypt Open file :${decryptedData}`);
    const stream = fs.createWriteStream(decryptedPNG);
    stream.write((decryptedData));
    stream.end();
    // console.log("Decrypted at "+ decryptedPNG);
}