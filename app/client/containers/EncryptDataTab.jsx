import React, { createRef } from 'react';
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

import { getLastSourceEncryptFolder, getLastDestinationEncryptFolder, setLastSourceEncryptFolder, getLastEncryptKey, setLastDestinationEncryptFolder, setLastEncryptKey } from '../storage/EncryptDataTabData';
import FileOptimizeRow from '../components/FileOptimizeRow';

import FileChooser from '../components/FileChooser';
import { sendGetFolderFilesRequest, sendEncryptRequest } from '../network/api';
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

class EncryptDataTab extends React.Component {

    constructor(props) {
        super(props);
        const src = getLastSourceEncryptFolder();
        if (src) {
            this.onClickSource(src);
        }
        this.state = {
            src,
            des: getLastDestinationEncryptFolder(),
            key: getLastEncryptKey() || this.props.t('default_encrypt_key'),
            files: []
        };
        this.dialogAlert = createRef();
    }

    onClickEncrypt = async () => {
        const { files, src, des, key } = this.state;
        if (!src) {
            console.log('Import src pls!');
            this.dialogAlert.current.showDialog(this.props.t('warning'), this.props.t('import_source'));
            return;
        }
        const names = files.map(file => `${file.subPath}/${file.base}`);
        await sendEncryptRequest(names, src, des, key);
        this.dialogAlert.current.showDialog(this.props.t('notification'), this.props.t('encrypt_success'));
    }

    onClickSource = async (src) => {
        if (src === undefined) {
            console.log("No file selected");
        } else {
            console.log("file selected", src);
            this.setState({ src });
            setLastSourceEncryptFolder(src);
            const files = await sendGetFolderFilesRequest(src, ['jpg$', 'png$', 'jpeg$']);
            this.setState({ files });
        }
    }

    onClickDestination = (des) => {
        this.setState({ des });
        setLastDestinationEncryptFolder(des);
    }

    handleChangeSource = (event) => {
        this.setState({ src: event.target.value });
    }

    handleChangeKey = (event) => {
        const key = event.target.value;
        this.setState({ key });
        setLastEncryptKey(key);
    }

    handleChangeDestination = (event) => {
        this.setState({ des: event.target.value });
    }

    render() {
        const { classes, t } = this.props;
        const { files, src, des } = this.state;
        return (
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <Paper>
                <FileChooser
                  isFolder
                  fileFolder={src}
                  label={t('source_folder')}
                  onChosenFolder={this.onClickSource}
                />
                <FileChooser
                  isFolder
                  fileFolder={des}
                  label={t('destination_folder')}
                  onChosenFolder={this.onClickDestination}
                />
                <TextField
                  id="outlined-with-placeholder"
                  fullWidth
                  label={t('encrypt_key')}
                  placeholder="100px"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.key}
                  onChange={this.handleChangeKey}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                  className={classes.button}
                  onClick={this.onClickEncrypt}
                >
                  {t('encrypt_data')}
                </Button>
                <DialogAlert innerRef={this.dialogAlert} buttonLabel={t('ok')} />
              </Paper>
            </Grid>
            <Grid item xs={8}>
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
                        key={`EncryptDataTab${index}`} // eslint-disable-line
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

EncryptDataTab.propTypes = {
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('translations')(EncryptDataTab));
