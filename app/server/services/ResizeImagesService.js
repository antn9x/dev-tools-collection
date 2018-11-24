import Logger from "../utils/Logger";

const sharp = require('sharp');

// Command line interface

export default function createThumnail(imgPath, outputDir){
    const fileName = imgPath.replace(/^.*[\\/]/, '');
    const newPath = outputDir + fileName;

    console.log(`Filename: ${  fileName}`);

    sharp(imgPath)
    .resize(268, 154)
    .max()
    .toFile(newPath, (err) => {
        // imgPath
        Logger.error(err);
    });
}
