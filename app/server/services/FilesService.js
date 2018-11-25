import dir from 'node-dir';
// import Logger from '../utils/Logger';

const handelFile = async (file, pattern) => {
    // Logger.info('handle file', file, pattern);

    if (!pattern || file.match(pattern)) {
        // Logger.log({ baseName, basePath, newName });
        return file;
    }
};

export default function getFilesInFoler({ src, pattern }) {
    return dir.promiseFiles(src)
        .then(files => Promise.all(files.map(file => handelFile(file, pattern))));
}
