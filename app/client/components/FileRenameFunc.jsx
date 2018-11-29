import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

class FileRenameFunc extends Component {
  state = {}

  handleChangeExt = (event) => {
    this.props.ext(event.target.value);
  }

  render() {
    const { label, defaultExt } = this.props;

    return (
      <React.Fragment>
        <TextField
          id="outlined-name"
          style={{ margin: '8px 0' }}
          variant="outlined"
          label={label}
          value={defaultExt}
          onChange={this.handleChangeExt}
        />
      </React.Fragment>
    );
  }
}

FileRenameFunc.propTypes = {
  label: PropTypes.string.isRequired,
  ext: PropTypes.func.isRequired,
  defaultExt: PropTypes.string.isRequired
};
 
export default FileRenameFunc;