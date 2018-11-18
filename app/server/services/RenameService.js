import dir from 'node-dir';
import fs from 'fs';
import path from 'path';

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

const renameFolder = (source, pattern, replaceTo) => dir.promiseFiles(source)
  .then(files => Promise.all(files.map(file => handelFile(file, pattern, replaceTo))));

export default function onRename(data) {
  const { src, pattern, replaceTo } = data;
  return renameFolder(src, pattern, replaceTo).
    then(() => 'Rename success!')
    .catch((error) => error.message);
}
