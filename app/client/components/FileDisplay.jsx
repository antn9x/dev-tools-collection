import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
// import path from 'path';

class FileDisplay extends Component {

  checkFile = () => {
    this.props.clickCheckbox(null,this.props.file);
  }

  render() {
    const { file} = this.props;
    const demension = `${this.props.width} x ${this.props.height}`;
    const oldName = file.base;
    
    return (
      <TableRow >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={this.checkFile}
            // onChange={isSelected}
          />
        </TableCell>
        <TableCell style={{ fontSize: 14 }}>{oldName}</TableCell>
        <TableCell>
          <TextField
            id="outlined-with-placeholder"
            label="Pattern"
            margin="normal"
            variant="outlined"
            fullWidth="true"
            value={demension}
          />
        </TableCell>
      </TableRow>
    );
  }
}

FileDisplay.propTypes = {
    clickCheckbox: PropTypes.func.isRequired,
    // isSelected: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
};

export default FileDisplay;