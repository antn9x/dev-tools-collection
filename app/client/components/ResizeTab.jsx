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
import FileDisplay from './FileDisplay';

import { RE_SIZE, GET_FOLDER_FILES } from '../../constant.message';
import { getLastResizeFolder, setLastResizeFolder } from '../storage/ResizeTabData';

import FileChooser from './FileChooser';
import FileChooserSave from './FileChooserSave';

const { dialog } = remote;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    dispaly: 'flex',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ResizeTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: getLastResizeFolder(),
      selected: [],
      files: [],
      srcOpenFile: '',
      des: '',
      namelist: [],
      pattern: '',
      replaceTo: ''
    };
  }

  onClickResize = () => {
    
  }

  handleChangeReplaceTo = (event) => {
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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  receiveListFile = (data) => {
    this.setState({
      files: [...data.listFile],
      srcOpenFile: data.fileName
    });
  }

  receiveFileSave = (fileSave) => {
    this.setState({
      des: fileSave
    });
  }

  render() {
    const { classes } = this.props;
    const { files, selected } = this.state;

    return (
      <Grid container >
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <FileChooser listFile={this.receiveListFile}/>
            <FileChooserSave fileSave={this.receiveFileSave}/>
            <Paper>
              <TextField
                id="outlined-with-placeholder"
                label="Width"
                placeholder="100px"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.pattern}
                onChange={this.handleChangeDestination}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Height"
                placeholder="100px"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.replaceTo}
                onChange={this.handleChangeReplaceTo}
              />
            </Paper>
            <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: 8 }}
                className={classes.button}
                onClick={this.onClickResize}
              >
                RE SIZE
              </Button>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < files.length}
                      checked={files.length !== 0 && selected.length === files.length}
                      onChange={this.handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Demension</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {files.map((file, index) => {
                  const isSelected = this.isSelected(index);
                  
                  return (
                    <FileDisplay
                      key={index}
                      file={file}
                      isSelected={isSelected}
                      clickCheckbox={this.handleClick}
                      selected={this.state.selected}
                      rename={this.onClickRename}
                      // propsNameImg={this.receiveNameImg}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ResizeTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResizeTab);
