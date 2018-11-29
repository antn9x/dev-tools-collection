import { ipcMain } from "electron";
import { GET_FOLDER_FILES, RENAME, RENAME_ALL, OPTIMIZE, RE_SIZE } from "../../constant.message";
// import onRename from "../services/RenameService";
import { onRenameAll } from '../services/RenameService';
import getFilesInFolder from "../services/FilesService";
import OptimizeAllImages from "../services/OptimizeImageService";
import { resizeAllImages } from "../services/ResizeImagesService";
// import Logger from "../utils/Logger";

const listListeners = [RENAME, GET_FOLDER_FILES, RENAME_ALL,OPTIMIZE, RE_SIZE];

async function handleLister(event, data, name) {
    let response = '';
    switch (name) {
        // case RENAME:
        //     response = await onRename(data);
        //     break;
        case GET_FOLDER_FILES:
            response = await getFilesInFolder(data);
            break;
        case RENAME_ALL:
            onRenameAll(data);
            break;
        case RE_SIZE:
            resizeAllImages(data);
            break;
        case OPTIMIZE:
            OptimizeAllImages(data);
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
