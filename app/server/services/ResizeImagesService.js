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
export const createThumbnail = (imageData) => {
  const {
    source,
    destination,
    name,
    width,
    height
  } = imageData;
  const fileName = path.join(source, name);
  const newPath = destination ? path.join(destination, name) : fileName;
  // Logger.log(`Filename: ${fileName}`, imageData);
  return new Promise((resolve, reject) => {
    sharp(fileName)
      .resize(width, height, { fit: "inside" })
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
    names,
    width,
    height
  } = imageListData;

  return Promise.all(names.map(name => genDataImagesList(src, des, name, width, height)).map(createThumbnail));
};
