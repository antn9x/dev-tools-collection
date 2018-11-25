import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import path from 'path';

class File extends Component {
  state = {
    newName: `${path.extname(this.props.file)}`
  }

  render() {
    const { clickCheckbox, isSelected, changeName, rename, file } = this.props;
    const { newName } = this.state;
    const oldName = path.basename(file);

    return (
      <TableRow selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            onClick={event => clickCheckbox(event, index)}
            checked={isSelected} />
        </TableCell>
        <TableCell style={{ fontSize: 14 }}>{oldName}</TableCell>
        <TableCell>
          <TextField
            id="outlined-with-placeholder"
            label="Pattern"
            margin="normal"
            variant="outlined"
            fullWidth="true"
            value={newName}
            onChange={this.handleChangeName}
          />
        </TableCell>
        <TableCell>
          <Button
          variant="outlined"
          color="secondary"
          onClick={() => this.handleRename()}>
            RE NAME
          </Button>
        </TableCell>
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