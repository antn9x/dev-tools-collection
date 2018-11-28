import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import path from 'path';

class FileOptimizeRow extends Component {
    state = {
        newName: this.props.file.base
    }

    handleChangeName = (event) => {
        this.setState({
            newName: event.target.value
        });
    }

    handleRename = () => {
        const oldName = path.basename(this.props.file.path);
        const filePath = path.dirname(this.props.file.path);
        const {newName} = this.state;
        this.props.rename(filePath, oldName, newName);
    }

    render() {
        const { clickCheckbox, isSelected, file } = this.props;
        // const { newName } = this.state;
        const oldName = file.base;

        return (
          <TableRow selected={isSelected}>
            <TableCell padding="checkbox">
              <Checkbox
                onClick={clickCheckbox}
                onChange={isSelected}
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
                value={this.state.newName}
                onChange={this.handleChangeName}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => this.handleRename()}
              >
                        RE NAME
              </Button>
            </TableCell>
          </TableRow>
        );
    }
}

FileOptimizeRow.propTypes = {
    clickCheckbox: PropTypes.object.isRequired,
    isSelected: PropTypes.object.isRequired,
    rename: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
};

export default FileOptimizeRow;