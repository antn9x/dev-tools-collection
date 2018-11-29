import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableCell, Checkbox, TextField, TableHead } from '@material-ui/core';

class AllFile extends Component {
  state = {
    src: ''
  }
  render() { 
    return ( 
      <Table aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox 
                checked={numSelected === rowCount}
                onChange={this.handleSelectAllClick}
              />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    );
  }
}

AllFile.propTypes = {
  src: PropTypes.string.isRequired
}
 
export default AllFile;