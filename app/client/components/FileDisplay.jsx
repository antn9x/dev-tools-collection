import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

class FileDisplay extends Component {
  checkFile = () => {
    this.props.file.check = ! this.props.file.check;
    this.props.clickCheckbox(this.props.file);
  }

  render() {
    const { file } = this.props;
    const demension = `${this.props.width} x ${this.props.height}`;
    const oldName = file.item.base;
    
    return (
      <TableRow >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={this.checkFile}
            checked={file.check}
          />
        </TableCell>
        <TableCell style={{ fontSize: 14 }}>{oldName}</TableCell>
        <TableCell>
          <TextField
            id="outlined-with-placeholder"
            label="Pattern"
            margin="normal"
            variant="outlined"
            fullWidth
            value={demension}
            
          />
        </TableCell>
      </TableRow>
    );
  }
}

FileDisplay.propTypes = {
    clickCheckbox: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default FileDisplay;