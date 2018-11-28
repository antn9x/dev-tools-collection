import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/FolderShared';

import { getLastResizeFolder } from '../storage/ResizeTabData';

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

class FileChooseSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          src: getLastResizeFolder(),
          files: []
        };
    }

    selectFileCallback = (fileNames) => {
        if (fileNames === undefined) {
          return
        } else {
            this.props.fileSave(fileNames)
            }
        }

    onClickSource = (src) => {
        dialog.showOpenDialog({
            title: "Select the a folder.",
            properties: ['openDirectory']
        }, (fileNames) => this.selectFileCallback(fileNames, src));
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

export default withStyles(styles)(FileChooseSave);