export default class FolderChooser extends FileChooser {
    onClickSource = () => {
        dialog.showOpenDialog({
            title: "Select the a folder.",
            properties: ['openDirectory']
        }, this.selectFileCallback);
    }
}
