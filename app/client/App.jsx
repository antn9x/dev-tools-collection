import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import { ipcRenderer } from 'electron';

import RenameTab from './containers/RenameTab';
import ResizeTab from './containers/ResizeTab';
import OptimizeImageTab from './containers/OptimizeImageTab';
import EncryptDataTab from './containers/EncryptDataTab';
import ConvertSpriteSheetExt from './containers/ConvertSpriteSheetExt';
import { CHANGE_FUNCTION } from '../constant.message';

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
    tab: 4,
    type: 0,
  };

  componentDidMount() {
    ipcRenderer.on(CHANGE_FUNCTION, (sender, type) => {
      const tab = type;
      this.setState({ tab, type });
    });
  }

  handleChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    const { classes, t } = this.props;
    const { tab, type } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Tabs value={tab} onChange={this.handleChange}>
            <Tab label="Rename" />
            <Tab label="Resize Image" />
            <Tab label="Optimize Image" />
            <Tab label={t('encrypt_data')} />
            <Tab label={t('convert_sprite_sheet_ext')} />
          </Tabs>
        </AppBar>
        <TabContainer>
          {tab === 0 && <RenameTab />}
          {tab === 1 && <ResizeTab functionType={type} />}
          {tab === 2 && <OptimizeImageTab />}
          {tab === 3 && <EncryptDataTab />}
          {tab === 4 && <ConvertSpriteSheetExt />}
        </TabContainer>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('translations')(App));