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
      selected: [],
      files: [],
      fileOpen: '',
      fileSave: '',
      width: '',
      height: ''
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
      listName: selected.map(file=>`${file.item.subPath}/${file.item.base}`),
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

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({
          selected: this.state.files
      });
      return;
    }

    this.setState({ 
      selected: [] 
    });
  }

  handleClick = (data) => {
    const { files, selected, fileOpen, fileSave, width, height} = this.state;
    console.log(data);
    this.setState({ 
      selected: files.filter(el => el.check === true)
    });

    const dataResize = {
      src: fileOpen,
      listName: selected,
      des: fileSave,
      width,
      height
    };
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
      selected: listData
    });
      
    });
  }

  render() {
    const { classes } = this.props;
    const { files, selected, height, width } = this.state;

    return (
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <FileChooser
              label="Source folder"
              onChosenFolder={this.onChosenSource}
            />
            <FileChooser
              label="Destination folder"
              onChosenFolder={this.receiveFileSave}
            />
            <Paper >
              <TextField
                id="outlined-with-placeholder"
                label="Width"
                placeholder="100px"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={width}
                onChange={this.handleChangeDestination}
                // defaultValue={100}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Height"
                placeholder="100px"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={height}
                onChange={this.handleChangeReplaceTo}
                // defaultValue={100}
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
