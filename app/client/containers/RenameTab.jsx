import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core/';

import sass from './RenameTab.scss';

import { setLastSourceRenameFolder, getLastSourceRenameFolder } from '../storage/RenameTabData';

import { GET_FOLDER_FILES, MODIFY_EXT } from '../../constant.message';

import FileChooser from '../components/FileChooser';
import AllFile from '../components/AllFiles';
import FileRenameFunc from '../components/FileRenameFunc';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

class RenameTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: getLastSourceRenameFolder(),
      files: [],
      oldExt: '',
      newExt: ''
    };
  }

  handleGetFolderPath = (src) => {
    ipcRenderer.send(GET_FOLDER_FILES, { src });
    ipcRenderer.once(GET_FOLDER_FILES, (sender, response) => {
      setLastSourceRenameFolder(src);

      this.setState({
        files: response,
        src
      });
    });
  }

  handleOldExt = (oldExt) => {
    this.setState({
      oldExt
    });
  }

  handleNewExt = (newExt) => {
    this.setState({
      newExt
    });
  }

  handleModifyExt = () => {
    const { src, oldExt, newExt } = this.state;

    if (!oldExt || !newExt) {
      console.log('Not null');
      return;
    }

    const newExtName = newExt.indexOf('.') !== -1 ? newExt : `.${newExt}`;
    const oldExtName = oldExt.indexOf('.') !== -1 ? oldExt : `.${oldExt}`;

    ipcRenderer.send(MODIFY_EXT, { src, oldExtName, newExtName });
    ipcRenderer.once(MODIFY_EXT, (sender, response) => {
      console.log(response);
      this.handleGetFolderPath(src);
    });
  }

  render() {
    const { files, src, oldExt, newExt } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <FileChooser onChosenFolder={this.handleGetFolderPath} fileFolder={src} label="Source folder" />
            <FileChooser onChosenFolder={this.handleGetFolderPath} fileFolder={src} label="Destination folder" />

            <form className={sass['modify-ext']}>
              <FileRenameFunc defaultExt={oldExt} ext={this.handleOldExt} label="Old Ext" />
              <FileRenameFunc defaultExt={newExt} ext={this.handleNewExt} label="New Ext" />
              <Button
                className={sass['modify-btn']}
                variant="contained"
                color="primary"
                onClick={this.handleModifyExt}
              >Modify
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <AllFile
              files={files}
              src={src}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

RenameTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RenameTab);
