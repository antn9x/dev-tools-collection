import { ipcMain } from "electron";
import { GET_FOLDER_FILES, RENAME, RENAME_ALL } from "../../constant.message";
// import onRename from "../services/RenameService";
import { onRenameAll } from '../services/RenameService';
import getFilesInFoler from "../services/FilesService";
// import Logger from "../utils/Logger";

const listListeners = [RENAME, GET_FOLDER_FILES, RENAME_ALL];

async function handleLister(event, data, name) {
    let response = '';
    switch (name) {
        // case RENAME:
        //     response = await onRename(data);
        //     break;
        case GET_FOLDER_FILES:
            response = await getFilesInFoler(data);
            // Logger.info('  case GET_FOLDER_FILES:')
            break;
        case RENAME_ALL:
            onRenameAll(data);
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
