import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { translate } from 'react-i18next';

import {
  setLastSourceRenameFolder, getLastSourceRenameFolder,
  setLastDestinationRenameFolder, getLastDestinationRenameFolder
} from '../storage/RenameTabData';

import { sendGetFolderFilesRequest, sendModifyFileExtension, sendRename } from '../network/api';

import FileChooser from '../components/FileChooser';
import AllFiles from '../components/AllFiles';
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
      des: getLastDestinationRenameFolder(),
      files: [],
      filesSelectedRename: [],
      oldExt: '',
      newExt: '',
      oldName: '',
      newName: ''
    };
  }

  componentDidMount() {
    this.handleGetSourceFolder(this.state.src);
  }

  handleGetDestinationFolder = (des) => {
    this.setState({
      des
    });

    setLastDestinationRenameFolder(des);
  }

  handleGetSourceFolder = async (src) => {
    const response = await sendGetFolderFilesRequest(src);

    this.setState({
      files: response,
      src
    });

    setLastSourceRenameFolder(src);
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

  handleOldName = (oldName) => {
    this.setState({
      oldName
    });
  }

  handleNewName = (newName) => {
    this.setState({
      newName
    });
  }

  handleModifyExt = () => {
    const { src, des, oldExt, newExt } = this.state;

    if (!oldExt || !newExt) {
      console.log('Not null');
      return;
    }

    const newExtName = newExt.indexOf('.') !== -1 ? newExt : `.${newExt}`;
    const oldExtName = oldExt.indexOf('.') !== -1 ? oldExt : `.${oldExt}`;

    sendModifyFileExtension(src, des, oldExtName, newExtName).then(response => {
      this.handleGetSourceFolder(src);

      return response;
    }).catch();
  }

  handleRename = () => {
    const { filesSelectedRename, src, des, oldName, newName } = this.state;

    if (!oldName || !newName) {
      console.log('Not null');
      return;
    }

    if (!filesSelectedRename.length) {
      console.log('Please select file!');
      return;
    }

    sendRename(filesSelectedRename, src, des, oldName, newName).then(response => {
      this.handleGetSourceFolder(src);
      this.child.defaultSelect();

      return response;
    }).catch();
  }

  handleChangeDes = (des) => {
    this.setState({
      des
    }, () => {
      setLastDestinationRenameFolder(des);
    });
  }

  handleFilesSelectRename = (file, isSelect) => {
    if (isSelect) {
      this.setState({
        filesSelectedRename: [...this.state.filesSelectedRename, file]
      });
    } else {
      const index = this.state.filesSelectedRename.indexOf(file);
      this.setState({
        filesSelectedRename: this.state.filesSelectedRename.filter((_, i) => i !== index)
      });
    }
  }

  render() {
    const { files, src, des, oldExt, newExt, oldName, newName } = this.state;
    const { classes, t } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item lg={4}>
          <Grid container>
            <Grid item lg={12}>
              <FileChooser
                isFolder
                onChosenFolder={this.handleGetSourceFolder}
                fileFolder={src}
                label={t('source_folder')}
                title={t('title_source')}
              />
            </Grid>
            <Grid item lg={12}>
              <FileChooser
                isFolder
                onChosenFolder={this.handleChangeDes}
                fileFolder={des}
                label={t('destination_folder')}
                title={t('title_des')}
              />
            </Grid>
            <Grid item lg={12} container>
              <Grid item lg={4}>
                <FileRenameFunc
                  defaultExt={oldExt}
                  name={this.handleOldExt}
                  label={t('old_ext')}
                />
              </Grid>
              <Grid item lg={4}>
                <FileRenameFunc
                  defaultExt={newExt}
                  name={this.handleNewExt}
                  label={t('new_ext')}
                />
              </Grid>
              <Grid item lg={4}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={this.handleModifyExt}
                >Modify
                </Button>
              </Grid>
            </Grid>
            <Grid item lg={12} container>
              <Grid item lg={4}>
                <FileRenameFunc
                  defaultExt={oldName}
                  name={this.handleOldName}
                  label={t('old_name')}
                />
              </Grid>
              <Grid item lg={4}>
                <FileRenameFunc
                  defaultExt={newName}
                  name={this.handleNewName}
                  label={t('new_name')}
                />
              </Grid>
              <Grid item lg={4}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={this.handleRename}
                >Rename
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <AllFiles
              ref={instance => { this.child = instance; }}
              files={files}
              src={src}
              filesSelectRename={this.handleFilesSelectRename}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

RenameTab.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styles)(translate('translations')(RenameTab));
