import dir from 'node-dir';
import path from 'path';
// import Logger from '../utils/Logger';

const handelFile = async (file, pattern) => {
  // Logger.info('handle file', file, pattern);

  if (!pattern || file.match(pattern)) {
    // Logger.log({ baseName, basePath, newName });
    return {
      path: path.dirname(file),
      base: path.basename(file),
      ext: path.extname(file)
    };
  }
};

export default function getFilesInFoler({ src, pattern }) {
  return dir.promiseFiles(src)
    .then(files => Promise.all(files.map(file => handelFile(file, pattern))));
}
