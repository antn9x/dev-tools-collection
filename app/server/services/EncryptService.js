import { Logger } from '../utils/Logger';

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fs = require("fs");
const path = require('path');

const resFolder = '/Users/antn9x/Documents/cocos/TSReactionMagic/build/jsb-default/res';
const key = resFolder;

function encryptDecryptBinaryXOR(input) {
    const output = Buffer.alloc(input.length);
    for (let i = 0; i < input.length; i += 1) {
        const charCode = input[i] ^ key[i % key.length].charCodeAt(0);// eslint-disable-line
        output[i] = ((charCode));
    }
    return output;
}

const encrypt = (filePath, outputFile) => {
    const fileContent = fs.readFileSync(filePath);
    // console.log("Encrypt Open file :" + fileContent);
    const encryptedData = encryptDecryptBinaryXOR(fileContent);
    // console.log("Encrypted Open file :" + encryptedData);
    const stream = fs.createWriteStream(outputFile);
    stream.write(encryptedData);
    stream.end();
    console.log(`Encrypted file ${filePath} to ${outputFile}`);
};

const minThenEncrypt = (folderName) => {
    const imageSoure = resFolder + folderName;
    const outputFolder = `tmp/min${folderName}`;
    imagemin([`${imageSoure}/*.{jpg,png}`], outputFolder, {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({ quality: '65-80' })
        ]
    }).then(files => {
        // console.log(files);
        //= > [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
        for (let i = 0; i < files.length; i += 1) {
            const file = files[i];
            const filePath = file.path;
            const outputFile = imageSoure + file.path.replace(outputFolder, '');
            // console.log(file.path);
            encrypt(filePath, outputFile);
        }
        return true;
    }).catch(err => {
        Logger.error(err);
    });
};

function flatten(lists) {
    return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(dir => fs.statSync(dir).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

const foldersList = getDirectoriesRecursive(resFolder).map(dir => dir.replace(resFolder, ''));
// console.log(foldersList)

for (let i = 0; i < foldersList.length; i += 1) {
    const folderName = foldersList[i];
    // console.log("folderName "+folderName);
    minThenEncrypt(folderName);
}
