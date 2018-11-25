import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import path from 'path';

class File extends Component {
  state = {}

  render() {
    const { clickCheckbox, isSelected, changeName, rename, eachFileInfo } = this.props;
    const { newName } = this.state;
    const baseName = eachFileInfo.base;

    return (
      <TableRow selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            onClick={event => clickCheckbox(event, index)}
            checked={isSelected} />
        </TableCell>
        <TableCell style={{ fontSize: 14 }}>{baseName}</TableCell>
        {/* <TableCell>
          <TextField
            id="outlined-with-placeholder"
            label="Pattern"
            margin="normal"
            variant="outlined"
            value={newName}
            onChange={this.handleChangeName}
          />
        </TableCell> */}
      </TableRow>
    );
  }

  handleChangeName = (event) => {
    this.setState({
      newName: event.target.value
    });
  }

  handleRename = () => {
    const oldName = path.basename(this.props.file);
    const filePath = path.dirname(this.props.file);
    const newName = this.state.newName;
    this.props.rename(filePath, oldName, newName);
  }
}

export default File;