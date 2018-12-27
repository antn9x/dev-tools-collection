import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { translate } from 'react-i18next';

import { getLastSourceOptimizeFolder, getLastDestinationOptimizeFolder, setLastSourceOptimizeFolder, getLastOptimizeJPGQuality, setLastDestinationOptimizeFolder } from '../storage/OptimizeImageTabData';
import FileOptimizeRow from '../components/FileOptimizeRow';

import css from './OptimizeImageTab.css';
import FileChooser from '../components/FileChooser';
import { sendGetFolderFilesRequest, sendOptimizeRequest } from '../network/api';
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

class OptimizeImageTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            src: getLastSourceOptimizeFolder(),
            des: getLastDestinationOptimizeFolder(),
            quality: getLastOptimizeJPGQuality(),
            files: []
        };
        this.dialogAlert = createRef();
    }

    onClickOptimize = async () => {
        const { src, des, quality } = this.state;
        if (!src) {
            console.log('Import src pls!');
            this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('import_source'));
            return;
        }
        await sendOptimizeRequest(src, des, quality);
        this.dialogAlert.current.showDialog(this.props.t('notification'), this.props.t('optimze_success'));
    }

    onClickSource = async (src) => {
        if (src === undefined) {
            console.log("No file selected");
        } else {
            console.log("file selected", src);
            this.setState({ src });
            setLastSourceOptimizeFolder(src);
            const files = await sendGetFolderFilesRequest(src, ['jpg$', 'png$', 'jpeg$']);
            this.setState({ files });
        }
    }

    onClickDestination = (des) => {
        this.setState({ des });
        setLastDestinationOptimizeFolder(des);
    }

    handleChangeSource = (event) => {
        this.setState({ src: event.target.value });
    }

    handleChangeJPGQuality = (event) => {
        this.setState({ quality: event.target.value });
    }

    handleChangeDestination = (event) => {
        this.setState({ des: event.target.value });
    }

    render() {
        const { classes, t } = this.props;
        const { files, src, des, quality } = this.state;
        return (
          <Grid container spacing={8}>
            <Grid item xs={3}>
              <Paper className={css.functions_wrapper}>
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
                <TextField
                  id="outlined-with-placeholder"
                  label={t('jpg_quality')}
                  placeholder="100px"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={quality}
                  onChange={this.handleChangeJPGQuality}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={this.onClickOptimize}
                >
                  {t('optimize')}
                </Button>
                <DialogAlert innerRef={this.dialogAlert} buttonLabel={t('ok')} />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Table>
                  <TableHead >
                    <TableRow>
                      <TableCell className={classes.header}>{t('path')}</TableCell>
                      <TableCell className={classes.header}>{t('name')}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {files.map((file, index) => (
                      <FileOptimizeRow
                                        key={`OptimizeImageTab${index}`} // eslint-disable-line
                        fileName={file.base}
                        filePath={src + file.subPath}
                      />))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        );
    }
}

OptimizeImageTab.propTypes = {
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('translations')(OptimizeImageTab));
