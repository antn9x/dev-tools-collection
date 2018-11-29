import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

/**
 * Optimize a list of images
 * @param {Object} imageListData 
 */
const optimizeAllImages = (imageListData) => {
  const {
    src,
    des,
    qualityRange = '65-80',
  } = imageListData;
  return imagemin([src], des, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        qualityRange,
      }),
    ],
  });
};

export default optimizeAllImages;
