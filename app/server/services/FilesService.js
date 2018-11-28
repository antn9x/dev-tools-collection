import dir from 'node-dir';
import path from 'path';

const handelFile = async (srcFolder, file, patternList = []) => {

  if (!patternList.length || patternList.some(pat => file.match(pat))) {
    return {
      subPath: path.dirname(file).replace(srcFolder, ''),
      base: path.basename(file),
      ext: path.extname(file)
    };
  }
};

const getFilesInFolder = ({
    src,
    patternList
  }) => dir.promiseFiles(src)
  .then(files => Promise.all(files.map(file => handelFile(src, file, patternList))));

export default getFilesInFolder;
