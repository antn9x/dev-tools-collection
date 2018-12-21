import {
    setStringForKey,
    getStringForKey,
} from "./LocalDataManager";

const SRC_LAST_ENCRYPT_FOLDER = 'SRC_LAST_ENCRYPT_FOLDER';
const DES_LAST_ENCRYPT_FOLDER = 'DES_LAST_ENCRYPT_FOLDER';
const LAST_ENCRYPT_KEY = 'LAST_ENCRYPT_KEY';

export const setLastSourceEncryptFolder = (value) => {
    setStringForKey(SRC_LAST_ENCRYPT_FOLDER, value);
};

export const getLastSourceEncryptFolder = () => getStringForKey(SRC_LAST_ENCRYPT_FOLDER, '');

export const setLastDestinationEncryptFolder = (value) => {
    setStringForKey(DES_LAST_ENCRYPT_FOLDER, value);
};

export const getLastDestinationEncryptFolder = () => getStringForKey(DES_LAST_ENCRYPT_FOLDER, '');

export const setLastEncryptKey = (value) => {
    setStringForKey(LAST_ENCRYPT_KEY, value);
};

export const getLastEncryptKey = () => getStringForKey(LAST_ENCRYPT_KEY, '');
