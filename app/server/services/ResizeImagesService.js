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
    source,
    destination,
    name,
    width,
    height
  } = imageData;
  const fileName = path.resolve(source, name);
  const newPath = destination ? path.join(destination, name) : fileName;
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
const resizeListImages = (imageList) => Promise.all(imageList.map(createThumnail));

const genDataImagesList = (source, destination, name, width, height) => ({
  source,
  destination,
  width,
  height,
  name,
});
/**
 * Optimize a list of images
 * @param {Object} imageListData 
 */

export const resizeAllImages = (imageListData) => {
  const {
    src,
    des,
    nameList,
    qualityRange
  } = imageListData;

  return Promise.all(nameList.map(name => genDataImagesList(src, des, name, qualityRange)).map(resizeListImages));
};
