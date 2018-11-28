import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';

import Logger from '../utils/Logger';

/**
 * Create one image resized
 * @param {string} imgPath 
 * @param {string} outputDir 
 * @param {string} name 
 * @param {number} width 
 * @param {number} height 
 */
export const optimizeImage = (imageData) => {
  const {
    source,
    destination,
    quality = '65-80',
    name
  } = imageData;
  const fileName = path.resolve(source, name);
  const newPath = destination ? path.join(destination, name) : fileName;
  Logger.log(`Filename: ${fileName}`);
  return imagemin([source], newPath, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality,
      }),
    ],
  });
};

/**
 * Optimize a list of images
 * @param {Array} imageList 
 */
const optimizeListImages = (imageList) => Promise.all(imageList.map(optimizeImage));

const genDataImagesList = (source, destination, name, quality) => ({
  source,
  destination,
  quality,
  name,
});
/**
 * Optimize a list of images
 * @param {Object} imageListData 
 */

export const optimizeAllImages = (imageListData) => {
  const {
    src,
    des,
    nameList,
    qualityRange
  } = imageListData;

  return Promise.all(nameList.map(name => genDataImagesList(src, des, name, qualityRange)).map(optimizeListImages));
};
