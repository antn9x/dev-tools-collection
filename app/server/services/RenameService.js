import dir from 'node-dir';
import fs from 'fs';
import path from 'path';

// const handelFile = async (file, oldName, newName) => {
//   // Logger.info('handle file', file, pattern, replaceTo);
//   // if (file.match(pattern)) {
//   //   // const suffix = await sizeOf(file);
//   //   const baseName = path.basename(filePath);
//   //   const basePath = path.dirname(filePath);
//   //   const newNameFile = path.join(basePath, baseName.replace(oldName, newName));
//   //   // Logger.log({ baseName, basePath, newName });
//   //   fs.renameSync(filePath, newNameFile);
//   // }
//   const filePath = path.dirname(file);
//   const oldNamePath = path.join(filePath, oldName);
//   const newNamePath = path.join(filePath, newName);
//   // console.log(oldNamePath, newNamePath);

//   fs.renameSync(oldNamePath, newNamePath);
// };

const renameFolder = (filePath, oldName, newName) => {
  const oldNamePath = path.join(filePath, oldName);
  const newNamePath = path.join(filePath, newName);

  fs.rename(oldNamePath, newNamePath, () => {
    console.log('Rename success!');
  });
  // console.log(source, pattern, replaceTo);
  // return dir.promiseFiles(source)
  // .then(files => Promise.all(files.map(file => handelFile(file, pattern, replaceTo))));
}

export default function onRename(data) {
  // const { src, pattern, replaceTo } = data;
  const { filePath, oldName, newName } = data;
  // return renameFolder(src, pattern, replaceTo).
  //   then(() => 'Rename success!')
  //   .catch((error) => error.message);
  return renameFolder(filePath, oldName, newName)
    // .then(() => 'Rename success!')
    // .catch((error) => error.message);
}
