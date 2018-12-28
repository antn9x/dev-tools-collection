import path from 'path';
import sharp from 'sharp';
// import Logger from "../utils/Logger";
import DailyLog from "../utils/DailyLog";

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
export const resizeAllImages = async (imageListData) => {
  const {
    src,
    des,
    names,
    width,
    height
  } = imageListData;
  try {
    await Promise.all(names.map(name => genDataImagesList(src, des, name, width, height)).map(createThumbnail));
  } catch (error) {
    DailyLog.error(error);
    return error.message;
  }
};
