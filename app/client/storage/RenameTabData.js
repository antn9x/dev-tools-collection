import { getStringForKey, setStringForKey, getArrayForKey, setArrayForKey } from '../storage/LocalDataManager';

const SOURCE_LAST_RENAME_FOLDER = 'source-last-rename-folder';
const DESTINATION_LAST_RENAME_FOLDER = 'destination-last-rename-folder';
const FILES_LAST_RENAME = 'file-last-rename';

/**
 * 
 * @param {String} value source folder selected
 */
export const setLastSourceRenameFolder = (value) => {
  setStringForKey(SOURCE_LAST_RENAME_FOLDER, value);
};

export const getLastSourceRenameFolder = () => getStringForKey(SOURCE_LAST_RENAME_FOLDER, '');

/**
 * 
 * @param {String} value source folder selected
 */
export const setLastDesitnationRenameFolder = (value) => {
  setStringForKey(DESTINATION_LAST_RENAME_FOLDER, value);
};

export const getLastDesitnationRenameFolder = () => getStringForKey(DESTINATION_LAST_RENAME_FOLDER, '');

/**
 * 
 * @param {Array} value list files in folder selected
 */
export const setLastRenameFiles = (value) => {
  setArrayForKey(FILES_LAST_RENAME, value);
};

export const getLastRenameFiles = () => {
  const files = JSON.parse(getArrayForKey(FILES_LAST_RENAME, '[]'));

  return files;
};