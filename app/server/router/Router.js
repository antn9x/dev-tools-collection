import { ipcMain } from 'electron';
import {
  GET_FOLDER_FILES,
  MODIFY_EXT,
  OPTIMIZE,
  RE_SIZE,
  CHECK_FILE_EXIST,
  RENAME,
  ENCRYPT_DATA,
  LOG_DATA,
  CONVERT_SPRITE_SHEET_JSON2_XML,
  CREATE_MOBILE_ICONS,
  CREATE_ELECTRON_ICONS,
} from '../../constant.message';
import { modifyExt, rename } from '../services/RenameService';
import {
  getFilesInFolder,
  checkFileExist,
  convertSpriteSheetJSON2XML,
} from '../services/FilesService';
import OptimizeAllImages from '../services/OptimizeImageService';
import logData from '../services/LogService';
import { resizeAllImages } from '../services/ResizeImagesService';
import { encryptListFiles } from '../services/EncryptService';
import { createMobileIcons, createElectronIcons } from '../services/IconsService';
// import Logger from '../utils/Logger';

const addListener = (name, listener) => {
  ipcMain.on(name, async (event, data) => {
    const response = await listener(data);
    event.sender.send(name, response);
  });
};

export default function Router() {
  addListener(CHECK_FILE_EXIST, checkFileExist);
  addListener(GET_FOLDER_FILES, getFilesInFolder);
  addListener(OPTIMIZE, OptimizeAllImages);
  addListener(RE_SIZE, resizeAllImages);
  addListener(MODIFY_EXT, modifyExt);
  addListener(RENAME, rename);
  addListener(ENCRYPT_DATA, encryptListFiles);
  addListener(LOG_DATA, logData);
  addListener(CONVERT_SPRITE_SHEET_JSON2_XML, convertSpriteSheetJSON2XML);
  addListener(CREATE_MOBILE_ICONS, createMobileIcons);
  addListener(CREATE_ELECTRON_ICONS, createElectronIcons);
}
