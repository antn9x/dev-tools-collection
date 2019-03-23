import {
    setStringForKey,
    getStringForKey,
} from "./LocalDataManager";

const SRC_LAST_CONVERT_FOLDER = 'SRC_LAST_CONVERT_FOLDER';
const DES_LAST_CONVERT_FOLDER = 'DES_LAST_CONVERT_FOLDER';
const LAST_CONVERT_KEY = 'LAST_CONVERT_KEY';

export const setLastSourceConvertFolder = (value) => {
    setStringForKey(SRC_LAST_CONVERT_FOLDER, value);
};

export const getLastSourceConvertFolder = () => getStringForKey(SRC_LAST_CONVERT_FOLDER, '');

export const setLastDestinationConvertFolder = (value) => {
    setStringForKey(DES_LAST_CONVERT_FOLDER, value);
};

export const getLastDestinationConvertFolder = () => getStringForKey(DES_LAST_CONVERT_FOLDER, '');

export const setLastConvertType = (value) => {
    setStringForKey(LAST_CONVERT_KEY, value);
};

export const getLastConvertType = () => getStringForKey(LAST_CONVERT_KEY, 'JSON --> XML');
