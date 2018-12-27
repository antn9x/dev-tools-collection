import fs from 'fs';
import path from 'path';
import Logger from '../utils/Logger';

function encryptDecryptBinaryXOR(input, key) {
	const output = Buffer.alloc(input.length);
	for (let i = 0; i < input.length; i += 1) {
		const charCode = input[i] ^ key[i % key.length].charCodeAt(0); // eslint-disable-line
		output[i] = ((charCode));
	}
	return output;
}

export const encrypt = (imageData) => {
	const {
		source,
		destination,
		key = 'encryptDecryptBinaryXOR',
		name
	} = imageData;
	const fileName = path.join(source, name);
	const newPath = destination ? path.join(destination, name) : fileName;
	const fileContent = fs.readFileSync(fileName);
	const encryptedData = encryptDecryptBinaryXOR(fileContent, key);
	// console.log("Encrypted Open file :" + encryptedData);
	const stream = fs.createWriteStream(newPath);
	stream.write(encryptedData);
	stream.end();
	Logger.log(`Encrypted file ${fileName} to ${newPath}`);
};

/**
 * Encrypt a list of images
 * @param {Array} imageList 
 */
export const getEncryptListFiles = (source, destination, name, key) => ({
	source,
	destination,
	key,
	name,
});

/**
 * Encrypt a list of images
 * @param {Object} imageListData 
 */
export const encryptListFiles = (imageListData) => {
	const {
		src,
		des,
		names,
		key
	} = imageListData;

	return Promise.all(names.map(name => getEncryptListFiles(src, des, name, key)).map(encrypt));
};
