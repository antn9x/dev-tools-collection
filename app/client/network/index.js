import { ipcRenderer } from 'electron';
import {
  OPTIMIZE,
  GET_FOLDER_FILES,
  CHECK_FILE_EXIST,
  MODIFY_EXT,
  RENAME,
  ENCRYPT_DATA,
  RE_SIZE,
  LOG_DATA,
  CONVERT_SPRITE_SHEET_JSON2_XML,
  CREATE_MOBILE_ICONS,
  CREATE_ELECTRON_ICONS
} from '../../constant.message';

const sendRequest = (key, data) => {
  ipcRenderer.send(key, data);
  // console.log(key, data);
  return new Promise(resolve => {
    ipcRenderer.once(key, (sender, response) => {
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

/**
 * send resize image request to server
 * @param {Array} names list files name
 * @param {string} src source folder
 * @param {string} des destination folder
 * @param {Number} width destination width
 * @param {Number} height destination height
 */
export const sendResizeRequest = (src, des, names, width, height) =>
  sendRequest(RE_SIZE, { src, des, names, width, height });

/**
 * send data to server then log it to file
 * @param {String} message 
 */
export const sendLogRequest = (message) => sendRequest(LOG_DATA, message);

export const sendConvertRequest = (type, src, des) => sendRequest(CONVERT_SPRITE_SHEET_JSON2_XML, { type, src, des });

export const sendCreateMobileIconsRequest = ( src, des) => sendRequest(CREATE_MOBILE_ICONS, { src, des });

export const sendCreateElectronIconsRequest = ( src, des) => sendRequest(CREATE_ELECTRON_ICONS, { src, des });