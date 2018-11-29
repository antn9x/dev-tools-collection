import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { GET_FOLDER_FILES } from '../../constant.message';

import FileChooser from '../components/FileChooser';
// import AllFile from '../components/AllFiles';

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

class RenameTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      files: []
    };
  }

  handleGetFolderPath = (src) => {
    ipcRenderer.send(GET_FOLDER_FILES, { src });
    ipcRenderer.once(GET_FOLDER_FILES, (sender, response) => {
      this.setState({
        files: response,
        src
      });
    });
  }

  onClickSource = (src) => {
    dialog.showOpenDialog({
      title: "Select the a folder.",
      properties: ['openDirectory']
    }, (fileNames) => this.selectFileCallback(fileNames, src));
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

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <FileChooser onChosenFolder={this.handleGetFolderPath} label="Source folder" />
            <FileChooser onChosenFolder={this.handleGetFolderPath} label="Destination folder" />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {/* <Paper className={classes.paper}>
            <AllFile
              
            />
          </Paper> */}
        </Grid>
      </Grid>
    );
  }
}

RenameTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RenameTab);
