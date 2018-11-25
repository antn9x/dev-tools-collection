const APP_NAME = 'dev-tools-collection';
const getKeyForGame = key => `${APP_NAME}_${key}`;

export const getStringForKey = (key, defaultValue) => {
  const value = localStorage.getItem(getKeyForGame(key));
  return value || defaultValue;
};

export const setStringForKey = (key, value) => {
  localStorage.setItem(getKeyForGame(key), value);
};

export const getIntForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

export const setIntForKey = (key, value) => {
  setStringForKey(key, `${value}`);
};

export const getFloatForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return parseFloat(value);
};

export const setFloatForKey = (key, value) => {
  setStringForKey(key, `${value}`);
};

export const getObjectForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return JSON.parse(value);
};

export const setObjectForKey = (key, value) => {
  setStringForKey(key, JSON.stringify(value));
};

export const getBoolForKey = (key, defaultValue) => {
  const value = getStringForKey(key);
  if (!value) {
    return defaultValue;
  }
  return value === 'true';
};

export const setBoolForKey = (key, value) => {
  setStringForKey(key, value);
};
