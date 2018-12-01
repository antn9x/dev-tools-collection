import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = () => ({
    textLabel: {
        fontSize: 16,
    },
});

class FileOptimizeRow extends Component {
    render() {
        const { filePath, fileName, classes } = this.props;
        return (
          <TableRow >
            <TableCell className={classes.textLabel}>{filePath}</TableCell>
            <TableCell className={classes.textLabel}>{fileName}</TableCell>
          </TableRow>
        );
    }
}

FileOptimizeRow.propTypes = {
    filePath: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    fileName: PropTypes.string.isRequired,
};

export default withStyles(styles)(FileOptimizeRow);
