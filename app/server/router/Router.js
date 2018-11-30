import { ipcMain } from "electron";
import { GET_FOLDER_FILES, RENAME, MODIFY_EXT, OPTIMIZE, RE_SIZE, CHECK_FILE_EXIST } from "../../constant.message";
// import onRename from "../services/RenameService";
import { modifyExt } from '../services/RenameService';
import {getFilesInFolder, checkFileExist} from "../services/FilesService";
import OptimizeAllImages from "../services/OptimizeImageService";
import { resizeAllImages } from "../services/ResizeImagesService";
// import Logger from "../utils/Logger";

const listListeners = [RENAME, GET_FOLDER_FILES, MODIFY_EXT, OPTIMIZE, RE_SIZE, CHECK_FILE_EXIST];

async function handleLister(event, data, name) {
    let response = '';
    switch (name) {
        // case RENAME:
        //     response = await onRename(data);
        //     break;
        case CHECK_FILE_EXIST:
            response = await checkFileExist(data);
            break;
        case GET_FOLDER_FILES:
            response = await getFilesInFolder(data);
            break;
        case MODIFY_EXT:
            response = await modifyExt(data);
            break;
        case RE_SIZE:
            response = await resizeAllImages(data);
            break;
        case OPTIMIZE:
            response = await OptimizeAllImages(data);
            break;

        default:
            break;
    }
    // Logger.log('response', response);
    event.sender.send(name, response);
}

export default function Router() {
    listListeners.forEach(listenerName => {
        ipcMain.on(listenerName, (event, data) => handleLister(event, data, listenerName));
    });
}
