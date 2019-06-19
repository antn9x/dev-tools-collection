import {
    useStorage, STRING,
} from "./LocalDataManager";

export const LastSourceCreateMobileIcons = useStorage('SRC_LAST_CREATE_ICON_TOOL', STRING);
export const LastDestinationCreateMobileIcons = useStorage('DES_LAST_OPTIMIZE_TOOL', STRING);
