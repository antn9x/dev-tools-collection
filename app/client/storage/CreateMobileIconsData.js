import {
    useStorage, STRING,
} from "./LocalDataManager";

const [setLastSourceCreateMobileIcons, getLastSourceCreateMobileIcons] = useStorage('SRC_LAST_CREATE_ICON_TOOL', STRING);
const [setLastDestinationCreateMobileIcons, getLastDestinationCreateMobileIcons] = useStorage('DES_LAST_OPTIMIZE_TOOL', STRING);

export {
    setLastSourceCreateMobileIcons, getLastSourceCreateMobileIcons,
    setLastDestinationCreateMobileIcons, getLastDestinationCreateMobileIcons
};