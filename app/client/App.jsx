import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RenameTab from './containers/RenameTab';
import ResizeTab from './containers/ResizeTab';
import OptimizeImageTab from './containers/OptimizeImageTab';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth:1000
  },
});

class App extends React.Component {
  state = {
    value: 2,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Rename" />
            <Tab label="Resize Image" />
            <Tab label="Optimize Image" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><RenameTab /></TabContainer>}
        {value === 1 && <TabContainer><ResizeTab /></TabContainer>}
        {value === 2 && <TabContainer><OptimizeImageTab /></TabContainer>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);