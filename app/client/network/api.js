import {
  ipcRenderer
} from 'electron';
import {
  OPTIMIZE,
  GET_FOLDER_FILES,
  CHECK_FILE_EXIST,
  MODIFY_EXT,
  RENAME,
  ENCRYPT_DATA
} from '../../constant.message';

const sendRequest = (key, data) => {
  ipcRenderer.send(key, data);
  return new Promise(resolve => {
    ipcRenderer.once(key, (sender, response) => {
      // console.log(key, response);
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

/**
 * Modify name file extension in folder selected
 * @param {String} src source folder
 * @param {String} oldExtName Old name file extension
 * @param {String} newExtName New name file extension
 */
export const sendModifyFileExtension = (src, des, oldExtName, newExtName) => sendRequest(MODIFY_EXT, { src, des, oldExtName, newExtName });

export const sendRename = (filesSelectedRename, src, des, oldName, newName) => sendRequest(RENAME, { filesSelectedRename, src, des, oldName, newName });

/**
 * send encrypt request to server
 * @param {Array} names list files name
 * @param {string} src source folder
 * @param {string} des destination folder
 * @param {string} key secret key
 */
export const sendEncryptRequest = (names, src, des, key) => sendRequest(ENCRYPT_DATA, { names, src, des, key });