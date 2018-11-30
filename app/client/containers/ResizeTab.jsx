import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
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
import FileDisplay from '../components/FileDisplay';
import FileChooser from '../components/FileChooser';
import { GET_FOLDER_FILES, RE_SIZE } from '../../constant.message';
import { getLastSourceOptimizeFolder } from '../storage/OptimizeImageTabData';

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

class ResizeTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // src: getLastSourceOptimizeFolder(),
      selected: [],
      files: [],
      fileOpen: getLastSourceOptimizeFolder(),
      fileSave: '',
      width: 1000,
      height: 1000
    };
  }

  onClickResize = () => {
    const { fileOpen, fileSave, selected, width, height} = this.state;
    if( fileSave === '') {
      return alert("no path save file");
    }

    if( selected.length === 0 ) {
      return alert("no file Resize");
    }

    if(width === ''){
      return alert("no set width for file resize");
    }

    if(height === ''){
      return alert('no set height for file resize');
    }

    const resize = {
      src: fileOpen,
      des: fileSave,
      names: selected.map(file=>`${file.subPath}/${file.base}`),
      width,
      height
    };

    console.log(resize);
    ipcRenderer.send(RE_SIZE, resize);
    ipcRenderer.once(RE_SIZE, (sender, response) => {
      console.log(response);
    });
  }

  handleChangeDestination = (event) => {
    this.setState({
      width: event.target.value
    });
  }

  handleChangeReplaceTo = (event) => {
    this.setState({ height: event.target.value });
  }

  handleSelectAllClick = () => {
    let listFileCheck = this.state.files.map( el => {
      let obj = {};
      obj = {
        check: !el.check,
        item: el.item
      };
      return obj;
    });

    this.setState({
      files: listFileCheck
    });
  }

  handleClick = () => {
    let dataSendServer = [];
    this.state.files.filter(el => el.check === true).forEach( el => dataSendServer.push(el.item));
    this.setState({ 
      selected: dataSendServer
    });
  };


  receiveFileSave = (fileSave) => {
    this.setState({
      fileSave
    });
    console.log(fileSave);

  }

  onChosenSource = (src) => {
    ipcRenderer.send(GET_FOLDER_FILES, { src });
    ipcRenderer.once(GET_FOLDER_FILES, (sender, response) => {
    let listData = [];
    response.forEach(el => {
      listData.push({
        check: true,
        item: el
      });
    });

    this.setState({
      files: listData,
      fileOpen: src,
      selected: response
    });
      
    });
  }

  render() {
    const { classes } = this.props;
    const { files, selected, height, width, fileOpen,fileSave } = this.state;

    return (
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <FileChooser
              label="Source folder"
              onChosenFolder={this.onChosenSource}
              fileFolder={fileOpen}
            />
            <FileChooser
              label="Destination folder"
              onChosenFolder={this.receiveFileSave}
              fileFolder={fileSave}
            />
            <Paper >
              <TextField
                id="outlined-with-placeholder"
                label="Width"
                placeholder="100px"
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={this.handleChangeDestination}
                defaultValue={width}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Height"
                placeholder="100px"
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={this.handleChangeReplaceTo}
                defaultValue={height}
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
                      onClick={this.handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Demension</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  files.map((file, index) => (
                    <FileDisplay
                      key={index}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResizeTab);
