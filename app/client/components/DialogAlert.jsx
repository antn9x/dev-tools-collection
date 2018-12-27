import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
        const { open, title, description } = this.state;

        return (
          <Dialog
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
    buttonLabel: PropTypes.string.isRequired,
};

export default DialogAlert;