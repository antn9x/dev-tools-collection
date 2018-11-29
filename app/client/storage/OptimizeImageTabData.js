import {
  setStringForKey,
  getStringForKey,
} from "./LocalDataManager";

const SRC_LAST_OPTIMIZE_FOLDER = 'SRC_LAST_OPTIMIZE_FOLDER';
const DES_LAST_OPTIMIZE_FOLDER = 'DES_LAST_OPTIMIZE_FOLDER';
const LAST_OPTIMIZE_JPG_QUALITY_RANGE = 'LAST_OPTIMIZE_JPG_QUALITY_RANGE';

export const setLastSourceOptimizeFolder = (value) => {
  setStringForKey(SRC_LAST_OPTIMIZE_FOLDER, value);
};

export const getLastSourceOptimizeFolder = () => getStringForKey(SRC_LAST_OPTIMIZE_FOLDER, '');

export const setLastDestinationOptimizeFolder = (value) => {
  setStringForKey(DES_LAST_OPTIMIZE_FOLDER, value);
};

export const getLastDestinationOptimizeFolder = () => getStringForKey(DES_LAST_OPTIMIZE_FOLDER, '');

export const setLastOptimizeJPGQuality = (value) => {
  setStringForKey(LAST_OPTIMIZE_JPG_QUALITY_RANGE, value);
};

export const getLastOptimizeJPGQuality = () => getStringForKey(LAST_OPTIMIZE_JPG_QUALITY_RANGE, '60-75');
