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

import { OPTIMIZE, GET_FOLDER_FILES } from '../../constant.message';
import { getLastSourceOptimizeFolder, getLastDestinationOptimizeFolder, setLastSourceOptimizeFolder, getLastOptimizeJPGQuality } from '../storage/OptimizeImageTabData';
import FileOptimizeRow from '../components/FileOptimizeRow';

import css from './OptimizeImageTab.css';

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

class OptimizeImageTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: getLastSourceOptimizeFolder(),
            des: getLastDestinationOptimizeFolder(),
            quality: getLastOptimizeJPGQuality(),
            selected: [],
            files: []
        };
        this.handleChangeSource = this.handleChangeSource.bind(this);
        this.handleChangeDestination = this.handleChangeDestination.bind(this);
        this.selectFileCallback = this.selectFileCallback.bind(this);
        this.handleChangeJPGQuality = this.handleChangeJPGQuality.bind(this);
    }

    onClickOptimize = (filePath, oldName, newName) => {
        if (!newName) {
            console.log('Import new name pls!');
            return;
        }

        ipcRenderer.send(OPTIMIZE, { filePath, oldName, newName });

        ipcRenderer.once(OPTIMIZE, (sender, response) => {
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
            setLastSourceOptimizeFolder(src);
            ipcRenderer.send(GET_FOLDER_FILES, { src });
            ipcRenderer.once(GET_FOLDER_FILES, (sender, response) => {
                console.log(response);

                this.setState({
                    files: [...response]
                });
            });
        }
    }

    onClickSource = (src) => {
        dialog.showOpenDialog({
            title: "Select the a folder.",
            properties: ['openDirectory']
        }, (fileNames) => this.selectFileCallback(fileNames, src));
    }

    onClickDestination = (src) => {
        dialog.showOpenDialog({
            title: "Select the a folder.",
            properties: ['openDirectory']
        }, (fileNames) => this.selectFileCallback(fileNames, src));
    }

    handleChangeSource(event) {
        this.setState({ src: event.target.value });
    }

    handleChangeJPGQuality(event) {
        this.setState({ quality: event.target.value });
    }

    handleChangeDestination(event) {
        this.setState({ des: event.target.value });
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.files.map((file, index) => index) }));
            return;
        }
        this.setState({ selected: [] });
    }

    handleClick = (id) => {
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

    render() {
        const { classes } = this.props;
        const { files, selected } = this.state;

        return (
          <Grid container spacing={8}>
            <Grid item xs={3}>
              <Paper className={css.functions_wrapper}>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.onClickSource}>
                            Choose Source
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
                <TextField
                  id="outlined-full-width"
                  label="Source folder"
                  style={{ margin: 8 }}
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
                <Button variant="contained" color="primary" className={classes.button} onClick={this.onClickDestination}>
                            Choose Destination
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
                <TextField
                  id="outlined-full-width"
                  label="Destination folder"
                  style={{ margin: 8 }}
                  placeholder="Select folder with button above"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                                shrink: true,
                            }}
                  value={this.state.des}
                  onChange={this.handleChangeSource}
                />
                <TextField
                  id="outlined-with-placeholder"
                  label="JPG Quality"
                  placeholder="100px"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.quality}
                  onChange={this.handleChangeDestination}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={this.onClickOptimize}
                >
                            OPTIMIZE
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
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {files.map((file, index) => {
                        const isSelected = this.isSelected(index);
                        return (
                          <FileOptimizeRow
                            key="OptimizeImageTab"
                            fileName={file.base}
                            isSelected={isSelected}
                            clickCheckbox={() => this.handleClick(index)}
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

OptimizeImageTab.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OptimizeImageTab);
