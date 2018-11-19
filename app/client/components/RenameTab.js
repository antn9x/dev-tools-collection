import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { RENAME } from '../../constant.message';

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
            pattern: localStorage.getItem(SRC_LAST_RENAME_PATTERN) || '.js',
            replaceTo: localStorage.getItem(SRC_LAST_RENAME_REPLACE_TO) || '.ts'
        };
        this.handleChangeSource = this.handleChangeSource.bind(this);
        this.handleChangeDestination = this.handleChangeDestination.bind(this);
        this.selectFileCallback = this.selectFileCallback.bind(this);
        this.handleChangeReplaceTo = this.handleChangeReplaceTo.bind(this);
    }

    onClickRename() {
        if (!this.state.src) {
            alert('Please enter source folder!');
            return;
        }
        if (!this.state.pattern) {
            alert('Please enter pattern!');
            return;
        }
        const { src, pattern, replaceTo } = this.state;
        ipcRenderer.send(RENAME, { src, pattern, replaceTo });
        ipcRenderer.once(RENAME, (sender, response) => {
            localStorage.setItem(SRC_LAST_RENAME_FOLDER, src);
            localStorage.setItem(SRC_LAST_RENAME_PATTERN, pattern);
            localStorage.setItem(SRC_LAST_RENAME_REPLACE_TO, replaceTo);
            console.log(response);
        });
    }

    selectFileCallback(fileNames) {
        if (fileNames === undefined) {
            console.log("No file selected");

        } else {
            console.log("file selected", fileNames);
            const file = fileNames[0];
            this.setState({ src: file });
            localStorage.setItem(SRC_LAST_RENAME_FOLDER, file);
        }
    }

    onClickSource(src) {
        dialog.showOpenDialog({
            title: "Select the a folder.",
            properties: ['openDirectory']
        }, (fileNames) => this.selectFileCallback(fileNames, src));
    }

    handleChangeSource(event) {
        // console.log('Selected file:', event.target.value);
        this.setState({ src: event.target.value });
    }

    handleChangeDestination(event) {
        // console.log('Selected file:', event.target.value);
        this.setState({ pattern: event.target.value });
    }
    handleChangeReplaceTo(event) {
        // console.log('Selected file:', event.target.value);
        this.setState({ replaceTo: event.target.value });
    }
    render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <Grid container spacing={2}>
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
            </Grid>
          </div>

        );
    }
}

RenameTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenameTab);
