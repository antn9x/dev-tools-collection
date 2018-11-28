import React from 'react';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/FolderShared';

import { GET_FOLDER_FILES } from '../../constant.message';
import { getLastResizeFolder, setLastResizeFolder } from '../storage/ResizeTabData';

const { dialog } = remote;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class FileChoose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          src: getLastResizeFolder(),
          files: []
        };
    }

    selectFileCallback = (fileNames) => {
        if (fileNames === undefined) {
          console.log("No file selected");
    
        } else {
          console.log("file selected", fileNames);
          const src = fileNames[0];
          this.setState({ src });
          setLastResizeFolder(src);
          ipcRenderer.send(GET_FOLDER_FILES, { src });
          ipcRenderer.once(GET_FOLDER_FILES, (sender, response) => {
            
            this.setState({
              files: [...response]
            });

            this.props.listFile({
                fileName: fileNames,
                listFile: this.state.files})
          });
        }
      }

    onClickSource = (src) => {
        dialog.showOpenDialog({
            title: "Select the a folder.",
            properties: ['openDirectory']
        }, (fileNames) => this.selectFileCallback(fileNames, src));
    }

    handleChangeSource = (event) => {
        this.setState({ src: event.target.value });
    }

    render() {
    
        return (
          <Grid style={{display: "flex"}} >
                <TextField
                  id="outlined-full-width"
                  label="Source folder"
                  style={{ marginTop: 8 }}
                  placeholder="Select folder with button above"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.src}
                  onChange={this.handleChangeSource}
                />
                <CloudUploadIcon color="primary" style={{ width: 80,height:40,marginTop:10}} onClick={this.onClickSource}/>
          </Grid>
        );
      }
    }
    
export default withStyles(styles)(FileChoose);