import { getStringForKey, setStringForKey } from '../storage/LocalDataManager';

const SOURCE_LAST_RENAME_FOLDER = 'source-last-folder';

export const setLastSourceRenameFolder = (value) => {
  setStringForKey(SOURCE_LAST_RENAME_FOLDER, value);
};

export const getLastSourceRenameFolder = () => getStringForKey(SOURCE_LAST_RENAME_FOLDER, '');