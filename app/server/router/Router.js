import { ipcMain } from 'electron';
import {
  GET_FOLDER_FILES,
  MODIFY_EXT,
  OPTIMIZE,
  RE_SIZE,
  CHECK_FILE_EXIST,
  RENAME
} from '../../constant.message';
// import onRename from '../services/RenameService';
import { modifyExt, rename } from '../services/RenameService';
import {
  getFilesInFolder,
  checkFileExist,
} from '../services/FilesService';
import OptimizeAllImages from '../services/OptimizeImageService';
import { resizeAllImages } from '../services/ResizeImagesService';
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
}
