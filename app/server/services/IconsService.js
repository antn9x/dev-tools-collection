import path from 'path';
import sharp from 'sharp';

// Command line interface
const iconIOSSizes = [20, 40, 60, 29, 58, 87, 40, 80, 120, 50, 100, 57, 114, 120, 180, 72, 144, 76, 152, 167];
const iOSFilesName = ["20", "20@2x", "20@3x", "29", "29@2x", "29@3x", "40", "40@2x", "40@3x",
    "50", "50@2x", "57", "57@2x", "60@2x", "60@3x", "72", "72@2x", "76", "76@2x", "83.5@2x"];
const iconASSizes = [144, 96, 48, 72];
const foldersListAS = ["mipmap-xxhdpi", "mipmap-xhdpi", "mipmap-mdpi", "mipmap-hdpi"];

// let inputDir = path.resolve(__dirname, "../../tmp/icon");
// let resDir = path.resolve(__dirname, "../../dist/icon");
// if (!fs.existsSync(resDir)) {
//     fs.mkdirSync(resDir);
// }
function create1Icon(imgFile, newFile, size) {
    // console.log(`newFile: ${newFile}`);
    sharp(imgFile)
        .resize(size, size)
        .resize({ fit: "inside" })
        .toFile(newFile, (err) => {
            // imgPath
            if (err) console.log(err);
        });
}
// Create thumbnails
function createIOSIcons(imgFile, desFolder) {
    // console.log(`Input Filename: ${imgFile}`);
    for (let i = 0; i < iconIOSSizes.length; i += 1) {
        const size = iconIOSSizes[i];
        const outputFileName = `Icon-${iOSFilesName[i]}.png`;
        const outputFile = path.resolve(desFolder, "proj.ios_mac", "ios", "Images.xcassets", "AppIcon.appiconset", outputFileName);
        create1Icon(imgFile, outputFile, size);
    }
    const outputFileName = "icon.png";
    const outputFile = path.resolve(desFolder, "proj.ios_mac", "ios", "Images.xcassets", "AppIcon.appiconset", outputFileName);
    create1Icon(imgFile, outputFile, 1024);
}

function createAndroidStudioIcons(imgFile, desFolder) {
    for (let i = 0; i < iconASSizes.length; i += 1) {
        const size = iconASSizes[i];
        const folder = foldersListAS[i];
        const outputFileName = "ic_launcher.png";
        const outputFile = path.resolve(desFolder, "proj.android-studio", "app", "res", folder, outputFileName);
        create1Icon(imgFile, outputFile, size);
    }
}
const createMobileIcons = ({ src, des }) => {
    createIOSIcons(src, des);
    createAndroidStudioIcons(src, des);
};

export default createMobileIcons;