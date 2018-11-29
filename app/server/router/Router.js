import { ipcMain } from "electron";
import { GET_FOLDER_FILES, RENAME, MODIFY_EXT, OPTIMIZE, RE_SIZE } from "../../constant.message";
// import onRename from "../services/RenameService";
import { modifyExt } from '../services/RenameService';
import getFilesInFolder from "../services/FilesService";
import { optimizeAllImages } from "../services/OptimizeImageService";
import { resizeAllImages } from "../services/ResizeImagesService";
// import Logger from "../utils/Logger";

const listListeners = [RENAME, GET_FOLDER_FILES, MODIFY_EXT, OPTIMIZE, RE_SIZE];

async function handleLister(event, data, name) {
    let response = '';
    switch (name) {
        // case RENAME:
        //     response = await onRename(data);
        //     break;
        case GET_FOLDER_FILES:
            response = await getFilesInFolder(data);
            // Logger.info('  case GET_FOLDER_FILES:')
            break;
        case MODIFY_EXT:
            modifyExt(data);
            break;
        case RE_SIZE:
            resizeAllImages(data);
            break;
        case OPTIMIZE:
            optimizeAllImages(data);
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
