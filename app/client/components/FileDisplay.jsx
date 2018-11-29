import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
// import path from 'path';

class FileDisplay extends Component {
    state = {
        // newName: this.props.file.base
    }

    // handleChangeName = (event) => {
    //     this.setState({
    //         newName: event.target.value,
    //         replaceTo: this.props.replaceTo,
    //         pattern: this.props.pattern
    //     });
    // }

    // handleRename = () => {
    //     const oldName = path.basename(this.props.file.path);
    //     const filePath = path.dirname(this.props.file.path);
    //     const {newName} = this.state;
    //     this.props.rename(filePath, oldName, newName);
    // }

    render() {
        const { isSelected, file } = this.props;
        const demension = `${this.props.width} x ${this.props.height}`;
        const oldName = file.base;

        return (
          <TableRow selected={isSelected}>
            <TableCell padding="checkbox">
              <Checkbox
                // onClick={clickCheckbox}
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
                value={demension}
                // placeholder={demension}
                // onChange={this.handleChangeName}
              />
            </TableCell>
          </TableRow>
        );
    }
}

FileDisplay.propTypes = {
    isSelected: PropTypes.object.isRequired,
    // rename: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
};

export default FileDisplay;