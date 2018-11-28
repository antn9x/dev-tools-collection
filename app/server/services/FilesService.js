import dir from 'node-dir';
import path from 'path';

const handelFile = async (file, patternList = []) => {

  if (!patternList.length || patternList.some(pat => file.match(pat))) {
    return {
      path: path.dirname(file),
      base: path.basename(file),
      ext: path.extname(file)
    };
  }
};

const getFilesInFolder = ({src, patternList}) => dir.promiseFiles(src)
  .then(files => Promise.all(files.map(file => handelFile(file, patternList))));

export default getFilesInFolder;
