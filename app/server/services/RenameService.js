import dir from 'node-dir';
import fs from 'fs';
import path from 'path';
import replaceExt from 'replace-ext';
import { ncp } from 'ncp';

const handleModifyExt = async (folderPath, oldExt, newExt) => {
  const allFilesPath = await dir.promiseFiles(folderPath);

  allFilesPath.forEach((filePath) => {
    const ext = path.extname(filePath);

    if (ext === oldExt) {
      const oldExtPath = path.resolve(filePath);
      const newExtPath = replaceExt(oldExtPath, newExt);

      fs.renameSync(oldExtPath, newExtPath);
    }
  });
};

export const rename = () => {

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
  } else {
    handleModifyExt(src, oldExtName, newExtName); 
  }

  return Promise.resolve();
};
