import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { translate } from 'react-i18next';

import {
  getLastSourceConvertFolder, getLastDestinationConvertFolder,
  setLastSourceConvertFolder, setLastDestinationConvertFolder,
  getLastConvertType
} from '../storage/ConvertSpriteSheetData';

import FileChooser from '../components/FileChooser';
import { sendConvertRequest } from '../network/api';
import DialogAlert from '../components/DialogAlert';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    fontSize: 16
  }
});

class ConvertDataTab extends React.Component {

  constructor(props) {
    super(props);
    const src = getLastSourceConvertFolder();
    if (src) {
      this.onClickSource(src);
    }
    this.state = {
      src,
      des: getLastDestinationConvertFolder(),
      type: getLastConvertType()
    };
    this.dialogAlert = createRef();
  }

  onClickConvert = async () => {
    const { type, src, des } = this.state;
    if (!src) {
      console.log('Import src pls!');
      this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('import_source'));
      return;
    }
    await sendConvertRequest(type, src, des);
    this.dialogAlert.current.showDialog(this.props.t('notification'), this.props.t('encrypt_success'));
  }

  onClickSource = async (src) => {
    if (src === undefined) {
      console.log("No file selected");
    } else {
      console.log("file selected", src);
      this.setState({ src });
      setLastSourceConvertFolder(src);
    }
  }

  onClickDestination = (des) => {
    this.setState({ des });
    setLastDestinationConvertFolder(des);
  }

  handleChangeSource = (event) => {
    this.setState({ src: event.target.value });
  }

  handleChangeDestination = (event) => {
    this.setState({ des: event.target.value });
  }

  render() {
    const { classes, t } = this.props;
    const { type, src, des } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item lg={4}>
          <Paper>
            <FileChooser
              fileFolder={src}
              label={t('source_folder')}
              onChosenFolder={this.onClickSource}
            />
            <FileChooser
              fileFolder={des}
              label={t('destination_folder')}
              onChosenFolder={this.onClickDestination}
            />
            <div>
              {type}
            </div>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              className={classes.button}
              onClick={this.onClickConvert}
            >
              {t('convert_sprite_sheet_ext')}
            </Button>
            <DialogAlert innerRef={this.dialogAlert} buttonLabel={t('ok')} />
          </Paper>
        </Grid>
        <Grid item lg={8}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell className={classes.header}>{t('path')}</TableCell>
                  <TableCell className={classes.header}>{t('name')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody />
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ConvertDataTab.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('translations')(ConvertDataTab));
