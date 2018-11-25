import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ExtPopover extends Component {
  state = {
    oldExt: '',
    newExt: ''
  }

  render() {
    const { open, closePopup, anchorEl } = this.props;
    const { oldExt, newExt } = this.state;

    return (
      <Popover
        id="change-ext-popper"
        anchorEl={anchorEl}
        open={open}
        onClose={closePopup}>
        <TextField
          id="outlined-with-placeholder"
          label="Pattern"
          margin="normal"
          variant="outlined"
          value={oldExt}
          onChange={this.handleChangeOldExt}
        />
        <TextField
          id="outlined-with-placeholder"
          label="Replace to"
          margin="normal"
          variant="outlined"
          value={newExt}
          onChange={this.handleChangeNewExt}
        />

        <Button variant="outlined" color="secondary" onClick={this.handleRenameExt}>
          RE NAME
        </Button>
      </Popover>
    );
  }

  handleChangeOldExt = event => {
    this.setState({
      oldExt: event.target.value
    });
  }

  handleChangeNewExt = event => {
    this.setState({
      newExt: event.target.value
    });
  }

  handleRenameExt = () => {
    this.props.renameExt(this.state.oldExt, this.state.newExt);
    this.props.closePopup();
  }
}

export default ExtPopover;