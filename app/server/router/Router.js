import { ipcMain } from "electron";
import { GET_FOLDER_FILES, RENAME, RENAME_ALL, OPTIMIZE } from "../../constant.message";
// import onRename from "../services/RenameService";
import { onRenameAll } from '../services/RenameService';
import getFilesInFolder from "../services/FilesService";
import { optimizeListImages } from "../services/OptimizeImageService";
// import Logger from "../utils/Logger";

const listListeners = [RENAME, GET_FOLDER_FILES, RENAME_ALL,OPTIMIZE];

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
        case RENAME_ALL:
            onRenameAll(data);
            break;
        case OPTIMIZE:
            optimizeListImages(data);
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
