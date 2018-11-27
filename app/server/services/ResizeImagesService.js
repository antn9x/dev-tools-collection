import path from 'path';
import sharp from 'sharp';
import Logger from "../utils/Logger";

/**
 * Create one image resized
 * @param {string} imgPath 
 * @param {string} outputDir 
 * @param {string} name 
 * @param {number} width 
 * @param {number} height 
 */
export const createThumnail = (imageData) => {
  const {
    imgPath,
    outputDir,
    name,
    width,
    height
  } = imageData;
  const fileName = path.resolve(imgPath, name);
  const newPath = outputDir ? path.join(outputDir, name) : fileName;
  Logger.log(`Filename: ${  fileName}`);
  return new Promise((resolve, reject) => {
    sharp(fileName)
      .resize(width, height)
      .max()
      .toFile(newPath, (err) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }
        resolve();
      });

  });
};

/**
 * resize a list of images
 * @param {Array} imageList 
 */
export const resizeListImages = (imageList) => Promise.all(imageList.map(createThumnail));
