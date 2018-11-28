import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const styles = () => ({
    textLabel: {
        fontSize: 16,
    },
});

class FileOptimizeRow extends Component {
    render() {
        const { clickCheckbox, isSelected, fileName, classes } = this.props;
        return (
          <TableRow selected={isSelected}>
            <TableCell padding="checkbox">
              <Checkbox
                onClick={clickCheckbox}
                value={isSelected}
              />
            </TableCell>
            <TableCell className={classes.textLabel}>{fileName}</TableCell>
          </TableRow>
        );
    }
}

FileOptimizeRow.propTypes = {
    clickCheckbox: PropTypes.object.isRequired,
    isSelected: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    fileName: PropTypes.string.isRequired,
};

export default withStyles(styles)(FileOptimizeRow);
