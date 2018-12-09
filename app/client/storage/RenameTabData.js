import { getStringForKey, setStringForKey } from '../storage/LocalDataManager';

const SOURCE_LAST_RENAME_FOLDER = 'source-last-rename-folder';
const DESTINATION_LAST_RENAME_FOLDER = 'destination-last-rename-folder';

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
  console.log(value);
  setStringForKey(DESTINATION_LAST_RENAME_FOLDER, value);
};

export const getLastDesitnationRenameFolder = () => getStringForKey(DESTINATION_LAST_RENAME_FOLDER, '');