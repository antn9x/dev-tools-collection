import React from 'react';
import { remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import PropTypes from 'prop-types';


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

class FileChooser extends React.Component {

  state = {
    src: ''
  }

  selectFileCallback = (fileNames) => {
    if (fileNames === undefined) {
      console.log("No file selected");
    } else {
      console.log("file selected", fileNames);
      const src = fileNames[0];
      this.setState({ src });
      this.props.onChosenFolder(src);
    }
  }

  onClickSource = () => {
    dialog.showOpenDialog({
      title: "Select the a folder.",
      properties: ['openDirectory']
    }, this.selectFileCallback);
  }

  handleChangeSource = (event) => {
    this.setState({ src: event.target.value });
  }

  render() {

    return (
      <Grid style={{ display: "flex" }} >
        <TextField
          id="outlined-full-width"
          label={this.props.label}
          style={{ marginTop: 8 }}
          placeholder="Select folder with button"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.src}
          onChange={this.handleChangeSource}
        />
        <FolderSharedIcon color="primary" style={{ width: 80, height: 40, marginTop: 10 }} onClick={this.onClickSource} />
      </Grid>
    );
  }
}

FileChooser.propTypes = {
  onChosenFolder: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(FileChooser);