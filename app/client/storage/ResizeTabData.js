import {
  setStringForKey,
  getStringForKey,
  setIntForKey,
  getIntForKey
} from "./LocalDataManager";

const SRC_LAST_RESIZE_FOLDER = 'src_Last_RESIZE_folder';
const LAST_RESIZE_WIDTH = 'SRC_LAST_RESIZE_WIDTH';
const LAST_RESIZE_HEIGHT = 'SRC_LAST_RESIZE_HEIGHT';

export const setLastResizeFolder = (value) => {
  setStringForKey(SRC_LAST_RESIZE_FOLDER, value);
};

export const getLastResizeFolder = () => getStringForKey(SRC_LAST_RESIZE_FOLDER, '');

export const setLastResizeWidth = (value) => {
  setIntForKey(LAST_RESIZE_WIDTH, value);
};

export const getLastResizeWidth = () => getIntForKey(LAST_RESIZE_WIDTH, 1);

export const setLastResizeHeight = (value) => {
  setIntForKey(LAST_RESIZE_HEIGHT, value);
};

export const getLastResizeHeight = () => getIntForKey(LAST_RESIZE_HEIGHT, 1);
