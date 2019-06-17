/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Table, { Column } from 'react-virtualized/dist/commonjs/Table';

const styles = () => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: '#FFFFFF'
  },
  tableRow: {
    cursor: 'pointer',
    backgroundColor: '#333333',
    color: '#FFFFFF'
  },
  tableRowSelected: {
    backgroundColor: '#E6E6E6',
    color: '#333333',
    '& div': {
      color: '#333333',
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, editingIndex } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowSelected]: index !== -1 && editingIndex === index,
    });
  };

  cellRenderer = ({ cellData, columnIndex, dataKey }) => {
    const {
      columns, classes, rowHeight, onRowClick
    } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {dataKey === 'text' ? <span dangerouslySetInnerHTML={{ __html: cellData }} />
          : cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'center' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const {
      classes, columns, editingIndex, ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            {...tableProps}
            scrollToIndex={editingIndex}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => (
              <Column
                key={dataKey}
                headerRenderer={headerProps => this.headerRenderer({
                  ...headerProps,
                  columnIndex: index,
                })
                  }
                className={classes.flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
  editingIndex: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function ReactVirtualizedTable({
  columns, rows, onRowClick, editingIndex
}) {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
        onRowClick={onRowClick}
        editingIndex={editingIndex}
      />
    </Paper>
  );
}
ReactVirtualizedTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func.isRequired,
  editingIndex: PropTypes.number.isRequired,
};

export default ReactVirtualizedTable;
