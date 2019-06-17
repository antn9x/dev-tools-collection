import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import { ipcRenderer } from 'electron';

import RenameTab from './containers/RenameTab';
import ResizeTab from './containers/ResizeTab';
import OptimizeImageTab from './containers/OptimizeImageTab';
import EncryptDataTab from './containers/EncryptDataTab';
import ConvertSpriteSheetExt from './containers/ConvertSpriteSheetExt';
import { CHANGE_FUNCTION } from '../constant.message';
import CreateMobileIcons from './containers/CreateMobileIcons';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
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
    tab: 0,
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

  getTab = (tab, type) => {
    switch (tab) {
      case 0:
        return RenameTab;
      case 1:
        return type ? CreateMobileIcons : ResizeTab;
      case 2:
        return OptimizeImageTab;
      case 3:
        return EncryptDataTab;
      case 4:
        return ConvertSpriteSheetExt;
      default:
        return RenameTab;
    }
  }

  render() {
    const { classes, t } = this.props;
    const { tab, type } = this.state;
    const TabComponent = this.getTab(tab, type);

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
          <TabComponent />
        </TabContainer>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(withTranslation('translations')(App));