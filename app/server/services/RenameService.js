import dir from 'node-dir';
import fs from 'fs';
import path from 'path';
import replaceExt from 'replace-ext';
import { ncp } from 'ncp';

const handleModifyExt = async (folderPath, oldExt, newExt) => {
  const allFilesPath = await dir.promiseFiles(folderPath);

  allFilesPath.forEach(filePath => {
    const ext = path.extname(filePath);

    if (ext === oldExt) {
      const oldExtPath = path.resolve(filePath);
      const newExtPath = replaceExt(oldExtPath, newExt);

      fs.renameSync(oldExtPath, newExtPath);
    }
  });
};

const handleRename = async (folderPath, oldName, newName) => {
  const allFilesPath = await dir.promiseFiles(folderPath);

  allFilesPath.forEach(filePath => {
    console.log(path.dirname(filePath));
    const basename = path.basename(filePath);

    const newBasename = basename.replace(oldName, newName);

    const oldNamePath = path.resolve(filePath);
    const newNamePath = path.resolve(path.dirname(filePath), newBasename);

    fs.renameSync(oldNamePath, newNamePath);
  });
};

export const rename = (data) => {
  const { src, des, oldName, newName } = data;

  if (des) {
    ncp(src, des, (err) => {
      if (err) {
        throw err;
      }

      console.log('done');

      handleRename(des, oldName, newName);
    });

    return Promise.resolve();
  }

  handleRename(src, oldName, newName);

  return Promise.resolve();
};

export const modifyExt = async (data) => {
  const { src, des, oldExtName, newExtName } = data;

  if (des) {
    ncp(src, des, (err) => {
      if (err) {
        throw err;
      }

      console.log('done');

      handleModifyExt(des, oldExtName, newExtName);
    });

    return Promise.resolve();
  }

  handleModifyExt(src, oldExtName, newExtName);

  return Promise.resolve();
};
