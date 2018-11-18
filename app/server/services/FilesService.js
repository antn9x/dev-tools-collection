import dir from 'node-dir';

const handelFile = async (file, pattern) => {
    // Logger.info('handle file', file, pattern, replaceTo);
    if (file.match(pattern)) {
        // Logger.log({ baseName, basePath, newName });
        return file;
    }
};

export default function getFilesInFoler({ source, pattern }) {
    return dir.promiseFiles(source)
        .then(files => Promise.all(files.map(file => handelFile(file, pattern))));
}
