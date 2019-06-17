import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation } from 'react-i18next';

import FileDisplay from '../components/FileDisplay';
import FileChooser from '../components/FileChooser';
import DialogAlert from '../components/DialogAlert';
import { sendResizeRequest, sendGetFolderFilesRequest, sendLogRequest } from '../network/api';
import {
  getLastResizeFolder, getLastResizeWidth, getLastResizeHeight, setLastResizeFolder,
  setLastResizeDestinationFolder, setLastResizeWidth, setLastResizeHeight, getLastResizeDestinationFolder
} from '../storage/ResizeTabData';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ResizeTab extends React.Component {

  constructor(props) {
    super(props);
    const fileOpen = getLastResizeFolder();
    if (fileOpen) {
      this.onChosenSource(fileOpen);
    }

    this.state = {
      selected: [],
      files: [],
      fileOpen,
      fileSave: getLastResizeDestinationFolder(),
      width: getLastResizeWidth(),
      height: getLastResizeHeight()
    };
    this.dialogAlert = createRef();
  }

  onClickResize = async () => {
    const { fileOpen, fileSave, selected, width, height } = this.state;
    if (!fileOpen) {
      this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('import_source'));
      return;
    }

    if (!selected.length) {
      this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('no_file_selected'));
      return;
    }

    if (!width) {
      this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('enter_width'));
      return;
    }

    if (!height) {
      this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('enter_height'));
      return;
    }

    const names = selected.map(file => `${file.subPath}/${file.base}`);
    sendLogRequest(JSON.stringify({ fileOpen, fileSave, selected, width, height }));
    await sendResizeRequest(fileOpen, fileSave, names, width, height);
    this.dialogAlert.current.showDialog(this.props.t('notification'), this.props.t('resize_success'));
    setLastResizeFolder(fileOpen);
    setLastResizeDestinationFolder(fileSave);
    setLastResizeWidth(width);
    setLastResizeHeight(height);
  }

  handleChangeWidth = (event) => {
    const width = parseInt(event.target.value, 10);
    this.setState({ width });
  }

  handleChangeHeight = (event) => {
    const height = parseInt(event.target.value, 10);
    this.setState({ height });
  }

  handleSelectAllClick = () => {
    const listFileCheck = this.state.files.map(el => ({
      check: !el.check,
      item: el.item
    }));

    this.setState({
      files: listFileCheck
    });
  }

  handleClick = () => {
    const selected = this.state.files.filter(el => el.check === true).map(el => el.item);
    this.setState({ selected });
  };

  receiveFileSave = (fileSave) => {
    this.setState({ fileSave });
  }

  onChosenSource = async (src) => {
    const selected = await sendGetFolderFilesRequest(src, ['jpg$', 'png$', 'jpeg$']);

    const listData = selected.map(item => ({
      check: true,
      item
    }));
    this.setState({
      files: listData,
      fileOpen: src,
      selected
    });
  }

  render() {
    const { classes, t } = this.props;
    const { files, selected, height, width, fileOpen, fileSave } = this.state;

    return (
      <Grid container spacing={8}>
        <Grid item lg={4}>
          <Paper className={classes.paper}>
            <FileChooser
              isFolder
              label="Source folder"
              onChosenFolder={this.onChosenSource}
              fileFolder={fileOpen}
            />
            <FileChooser
              isFolder
              label="Destination folder"
              onChosenFolder={this.receiveFileSave}
              fileFolder={fileSave}
            />
            <Paper >
              <TextField
                id="outlined-with-placeholder"
                label={t("width")}
                placeholder="100px"
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChangeWidth}
                defaultValue={width}
              />
              <TextField
                id="outlined-with-placeholder"
                label={t("height")}
                placeholder="100px"
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleChangeHeight}
                defaultValue={height}
              />
            </Paper>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              style={{ marginTop: 8 }}
              className={classes.button}
              onClick={this.onClickResize}
            >
              {t('re_size')}
            </Button>
            <DialogAlert innerRef={this.dialogAlert} buttonLabel={t('ok')} />
          </Paper>
        </Grid>
        <Grid item lg={8}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < files.length}
                      checked={files.length !== 0 && selected.length === files.length}
                      onClick={this.handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell >{t('name')}</TableCell>
                  <TableCell >{t('dimension')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  files.map((file, index) => (
                    <FileDisplay
                      key={index} // eslint-disable-line
                      file={file}
                      height={height}
                      width={width}
                      clickCheckbox={this.handleClick}
                    />
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ResizeTab.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withTranslation('translations')(ResizeTab));
