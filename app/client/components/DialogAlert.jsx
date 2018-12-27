import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = {
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '80vh',
    minWidth: '30vw',
    maxWidth: '80vw',
  },
};

class DialogAlert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
    };
  }

  showDialog = (title, description) => {
    this.setState({ open: true, title, description });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { open, title, description } = this.state;

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>{this.props.buttonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogAlert.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default withStyles(styles)(DialogAlert);