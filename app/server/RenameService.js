import dir from 'node-dir';
import fs from 'fs';
import path from 'path';
// import Logger from './Logger';

// const { promisify } = require('util');
// const sizeOf = promisify(require('image-size'));

export const RENAME = 'rename';

const handelFile = async (file, pattern, replaceTo) => {
  // Logger.info('handle file', file, pattern, replaceTo);
  if (file.match(pattern)) {
    // const suffix = await sizeOf(file);
    const baseName = path.basename(file);
    const basePath = path.dirname(file);
    const newName = path.join(basePath, baseName.replace(pattern, replaceTo));
    // Logger.log({ baseName, basePath, newName });
    fs.renameSync(file, newName);
  }
};

export const renameFolder = (source, pattern, replaceTo) => dir.promiseFiles(source)
  .then(files => Promise.all(files.map(file => handelFile(file, pattern, replaceTo))));
