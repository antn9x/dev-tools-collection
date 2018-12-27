import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';

import RenameTab from './containers/RenameTab';
import ResizeTab from './containers/ResizeTab';
import OptimizeImageTab from './containers/OptimizeImageTab';
import EncryptDataTab from './containers/EncryptDataTab';

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
    minWidth: 1000
  },
});

class App extends React.Component {
  state = {
    tab: 2,
  };

  handleChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    const { classes, t } = this.props;
    const { tab } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Tabs value={tab} onChange={this.handleChange}>
            <Tab label="Rename" />
            <Tab label="Resize Image" />
            <Tab label="Optimize Image" />
            <Tab label={t('encrypt_data')} />
          </Tabs>
        </AppBar>
        {tab === 0 && <TabContainer><RenameTab /></TabContainer>}
        {tab === 1 && <TabContainer><ResizeTab /></TabContainer>}
        {tab === 2 && <TabContainer><OptimizeImageTab /></TabContainer>}
        {tab === 3 && <TabContainer><EncryptDataTab /></TabContainer>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('translations')(App));