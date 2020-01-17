import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import dir from 'node-dir';

const subDirPromise = src => new Promise((resolve, reject) => dir.subdirs(src, (err, subDirs) => {
  if (err) reject(err);
  resolve(subDirs);
}));

/**
 * Optimize a list of images
 * @param {Object} imageListData
 */
const optimizeAllImages = async (imageListData) => {
  const {
    src,
    des,
    qualityRange = '65-80',
  } = imageListData;
  const desFolder = des || src;
  // console.log(subdirs);
  const subDirs = await subDirPromise(src);
  return Promise.all(
    subDirs.map(dirName => imagemin([`${dirName}/*.{jpg,png}`], dirName.replace(src, desFolder), {
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          qualityRange,
        }),
      ],
    }))
  );
};

export default optimizeAllImages;
