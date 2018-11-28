import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import path from 'path';

class FileDisplay extends Component {
    state = {
      newName: this.props.file.base
    }

    handleChangeName = (event) => {
      this.setState({
        newName: event.target.value
      });
    }
    sendData = () => {
      this.props.clickCheckbox;
      this.props.propsNameIng(this.state.newName)
    }

    handleRename = () => {
      const oldName = path.basename(this.props.file.path);
      const filePath = path.dirname(this.props.file.path);
      const {newName} = this.state;
      this.props.rename(filePath, oldName, newName);
    }

    render() {
      const { clickCheckbox, isSelected, file } = this.props;
      const { newName } = this.state;

      return (
        <TableRow selected={isSelected}>
          <TableCell padding="checkbox">
            <Checkbox
              // onClick={clickCheckbox}
              onClick={this.sendData}
              onChange={isSelected}
            />
          </TableCell>
          <TableCell style={{ fontSize: 14 }}>{newName}</TableCell>
          <TableCell>
            <TextField
              id="outlined-with-placeholder"
              label="Pattern"
              margin="normal"
              variant="outlined"
              fullWidth="true"
              value="100 x 100"
              ref= "newNameItem"
              onChange={this.handleChangeName}
            />
          </TableCell>
        </TableRow>
      );
    }
}

FileDisplay.propTypes = {
    clickCheckbox: PropTypes.object.isRequired,
    isSelected: PropTypes.object.isRequired,
    rename: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
};

export default FileDisplay;