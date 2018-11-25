import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import File from './File';
import ExtPopover from './ExtPopover';

import { RENAME, GET_FOLDER_FILES, RENAME_ALL } from '../../constant.message';

const { dialog } = remote;

const SRC_LAST_RENAME_FOLDER = 'src_Last_Rename_folder';
const SRC_LAST_RENAME_PATTERN = 'src_Last_Rename_pattern';
const SRC_LAST_RENAME_REPLACE_TO = 'src_Last_Rename_replace_to';

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

class RenameTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: localStorage.getItem(SRC_LAST_RENAME_FOLDER) || '',
      // pattern: localStorage.getItem(SRC_LAST_RENAME_PATTERN) || '.js',
      // replaceTo: localStorage.getItem(SRC_LAST_RENAME_REPLACE_TO) || '.ts',
      selected: [],
      filesInfo: [],
      anchorEl: null
    };
    this.handleChangeSource = this.handleChangeSource.bind(this);
    // this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.selectFileCallback = this.selectFileCallback.bind(this);
    this.handleChangeReplaceTo = this.handleChangeReplaceTo.bind(this);
  }

  onClickRename = (filePath, oldName, newName) => {
    // if (!this.state.src) {
    //   alert('Please enter source folder!');
    //   return;
    // }
    // if (!this.state.pattern) {
    //   alert('Please enter pattern!');
    //   return;
    // }
    // const { src, pattern, replaceTo } = this.state;
    // ipcRenderer.send(RENAME, { src, pattern, replaceTo });
    if (!newName) {
      console.log('Import new name pls!');
      return;
    }

    ipcRenderer.send(RENAME, { filePath, oldName, newName });

    ipcRenderer.once(RENAME, (sender, response) => {
      // localStorage.setItem(SRC_LAST_RENAME_FOLDER, src);
      // localStorage.setItem(SRC_LAST_RENAME_PATTERN, pattern);
      // localStorage.setItem(SRC_LAST_RENAME_REPLACE_TO, replaceTo);
      console.log(response);
    });
  }

  selectFileCallback = (fileNames) => {
    if (fileNames === undefined) {
      console.log("No file selected");

    } else {
      console.log("file selected", fileNames);
      const src = fileNames[0];
      this.setState({ src });
      localStorage.setItem(SRC_LAST_RENAME_FOLDER, src);
      ipcRenderer.send(GET_FOLDER_FILES, { src });
      ipcRenderer.once(GET_FOLDER_FILES, (sender, response) => {
        this.setState({
          filesInfo: [...response]
        });

        console.log(this.state.filesInfo);
      });
    }
  }

  onClickSource = (src) => {
    dialog.showOpenDialog({
      title: "Select the a folder.",
      properties: ['openDirectory']
    }, (fileNames) => this.selectFileCallback(fileNames, src));
  }

  handleChangeSource(event) {
    // console.log('Selected file:', event.target.value);
    this.setState({ src: event.target.value });
  }

  // handleChangeDestination(event) {
  //   // console.log('Selected file:', event.target.value);
  //   this.setState({ pattern: event.target.value });
  // }
  handleChangeReplaceTo(event) {
    // console.log('Selected file:', event.target.value);
    this.setState({ replaceTo: event.target.value });
  }
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.files.map((file, index) => index) }));
      return;
    }
    this.setState({ selected: [] });
  }
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleOpenPopup = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClosePopup = () => {
    this.setState({
      anchorEl: null
    });
  }

  handleRenameExt = (oldExt, newExt) => {
    const { src } = this.state;
    console.log(RENAME_ALL);

    ipcRenderer.send(RENAME_ALL, { src, oldExt, newExt });
    ipcRenderer.once(RENAME_ALL, (sender, response) => {
      console.log(response);
    });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { filesInfo, selected, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {/* <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Button variant="contained" color="primary" className={classes.button} onClick={this.onClickSource}>
                Choose Source
                    <CloudUploadIcon className={classes.rightIcon} />

              </Button>
              <TextField
                id="outlined-full-width"
                label="Source folder"
                style={{ margin: 8 }}
                placeholder="Select folder with button above"
                helperText="Full width!"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.src}
                onChange={this.handleChangeSource}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Pattern"
                placeholder=".ts"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.pattern}
                onChange={this.handleChangeDestination}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Replace to"
                placeholder=".js"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.replaceTo}
                onChange={this.handleChangeReplaceTo}
              />
              <Button variant="outlined" color="secondary" className={classes.button} onClick={this.onClickRename}>
                RE NAME
                  </Button>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid> */}

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
          <Button variant="contained" color="primary" onClick={this.onClickSource}>
            Choose Source <CloudUploadIcon className={classes.rightIcon} />
          </Button>

          <Button
          variant="contained"
          color="secondary"
          aria-owns={open ? 'change-ext-popper' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenPopup}>
            Change Extname
          </Button>

          <Button variant="contained" color="default">
            Change Extname selected
          </Button>
        </div>

        <ExtPopover
        open={open}
        closePopup={this.handleClosePopup}
        anchorEl={anchorEl}
        renameExt={this.handleRenameExt} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < filesInfo.length}
                  checked={filesInfo.length !== 0 && selected.length === filesInfo.length}
                  onChange={this.handleSelectAllClick} />
              </TableCell>
              <TableCell>Name</TableCell>
              {/* <TableCell>New Name</TableCell> */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filesInfo.map((eachFileInfo, index) => {
              const isSelected = this.isSelected(index);

              return (
                <File
                key={index}
                eachFileInfo={eachFileInfo}
                isSelected={isSelected}
                clickCheckbox={this.handleClick}
                selected={this.state.selected} />
              )
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

RenameTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RenameTab);
