const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

export default (source, destination) => new Promise((resolve, reject) => {
  const src = `${source}/*.{jpg,png}`;
  imagemin([src], destination, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: '65-80',
      }),
    ],
  }).then(resolve).catch(reject);
});
