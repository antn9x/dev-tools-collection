import {
  ipcRenderer
} from 'electron';
import {
  OPTIMIZE,
  GET_FOLDER_FILES,
  CHECK_FILE_EXIST
} from '../../constant.message';

const sendRequest = (key, data) => {
  ipcRenderer.send(key, data);
  return new Promise(resolve => {
    ipcRenderer.once(key, (sender, response) => {
      console.log(key, response);
      resolve(response);
    });
  });
};

/**
 * 
 * @param {string} src 
 * @param {string} des 
 * @param {string} qualityRange 
 */
export const sendOptimizeRequest = (src, des, qualityRange) => sendRequest(OPTIMIZE, {
  src,
  des,
  qualityRange
});

/**
 * 
 * @param {string} src 
 * @param {Array<string>} patternList 
 */
export const sendGetFolderFilesRequest = (src, patternList) => sendRequest(GET_FOLDER_FILES, {
  src,
  patternList
});

/**
 * 
 * @param {String} folderPath 
 */
export const sendCheckFolderExisted = (folderPath) => sendRequest(CHECK_FILE_EXIST, folderPath);
