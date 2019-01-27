import React from 'react';
import { remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FolderIcon from '@material-ui/icons/Folder';
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
    src: this.props.fileFolder
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
      title: "Select the a file.",
    }, this.selectFileCallback);
  }

  handleChangeSource = (event) => {
    const src = event.target.value;
    this.setState({ src }, () => {
      this.props.onChosenFolder(src);
    });
  }

  render() {
    return (
      <Grid style={{ display: "flex" }} >
        <TextField
          id="outlined-full-width"
          label={this.props.label}
          style={{ marginTop: 8 }}
          placeholder={this.props.title}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.src}
          onChange={this.handleChangeSource}
        />
        <FolderIcon color="primary" style={{ width: 80, height: 40, marginTop: 10 }} onClick={this.onClickSource} />
      </Grid>
    );
  }
}

FileChooser.propTypes = {
  onChosenFolder: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  fileFolder: PropTypes.string.isRequired,
  title: PropTypes.string,
};

FileChooser.getDefaultProps = {
  title: ''
};

export default withStyles(styles)(FileChooser);