import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableCell, Checkbox, TableHead, TableBody } from '@material-ui/core';

class AllFiles extends Component {
  state = {
    selected: []
  }

  defaultSelect = () => {
    this.setState({
      selected: []
    });
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({
        selected: this.props.files.map((file, index) => index)
      });

      return;
    }

    this.setState({
      selected: []
    });
  }

  handleSelect = (event, id, file) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      this.props.filesSelectRename(file, true);
    } else {
      this.props.filesSelectRename(file, false);
    }

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { selected } = this.state;
    const { files, src } = this.props;

    const rowCount = files.length;
    const numSelected = selected.length;

    return (
      <Table aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={files.length !== 0 && numSelected === rowCount}
                onChange={this.handleSelectAllClick}
              />
            </TableCell>

            <TableCell style={{ fontSize: 14 }}>File Path</TableCell>

            <TableCell style={{ fontSize: 14 }}>File Name</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {files.map((file, index) => {
            const isSelected = this.isSelected(index);

            return (
              <TableRow key={file.name}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onClick={event => this.handleSelect(event, index, file)}
                  />
                </TableCell>

                <TableCell style={{ fontSize: 14 }}>
                  {`${src}${file.subPath}`}
                </TableCell>

                <TableCell style={{ fontSize: 14 }}>
                  {file.base}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

AllFiles.propTypes = {
  files: PropTypes.array.isRequired,
  src: PropTypes.string.isRequired,
  filesSelectRename: PropTypes.func.isRequired
};
 
export default AllFiles;