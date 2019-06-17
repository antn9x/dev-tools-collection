import React, { useState, useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import FileChooser from '../components/FileChooser';
import PaperDropZone from '../components/PaperDropZone';
import DialogAlert from '../components/DialogAlert';

import { sendCreateMobileIconsRequest } from '../network/api';

const SRC_LAST_OPTIMIZE_TOOL = 'src_Last_Optimize_tool';
const DES_LAST_OPTIMIZE_TOOL = 'des_Last_Optimize_tool';

const useStyles = makeStyles({
  root: {
    height: '80vh',
  }
});

const CreateMobileIcons = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [src, setSrc] = useState(localStorage.getItem(SRC_LAST_OPTIMIZE_TOOL) || '');
  const [des, setDes] = useState(localStorage.getItem(DES_LAST_OPTIMIZE_TOOL) || '');
  const dialogAlert = useRef();

  const onDropIcon = (files) => {
    console.log(files);
    setSrc(files[0].path);
    localStorage.setItem(SRC_LAST_OPTIMIZE_TOOL, files[0].path);
  };

  const onChangeDestination = (files) => {
    setDes(files);
    localStorage.setItem(DES_LAST_OPTIMIZE_TOOL, files);
  };

  const onClickOptimize = async () => {
    if (!src) {
      alert('Please enter source folder!');
      return;
    }
    if (!des) {
      alert('Please enter destination folder!');
      return;
    }
    console.log(src, des);
    await sendCreateMobileIconsRequest(src, des);
    dialogAlert.current.showDialog(this.props.t('notification'), this.props.t('optimze_success'));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item lg={4}>
        <Grid item xs={4} lg={12}>
          <PaperDropZone
            onDrop={onDropIcon}
            placeHolder={src || "Drop icon here. (square POT image like 512x512 or 1024x1024)"}
          />
        </Grid>
        <Grid xs={2} lg={12}>
          <FileChooser
            isFolder
            fileFolder={des}
            label={t('destination_folder')}
            placeHolder="Choose runtime-src folder for cocos creator"
            onChosenFolder={onChangeDestination}
          />
        </Grid>
        <Grid lg={6}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={onClickOptimize}
          >
            {t('convert_sprite_sheet_ext')}
          </Button>
        </Grid>
      </Grid>
      <hr />
      <Grid lg={8}>
        <Grid >
          <Button
            bsStyle="primary"
            bsSize="large"
            block
            className="optimizeButton"
            onClick={() => onClickOptimize()}
          >Create Icons
          </Button>
        </Grid>
      </Grid>
      <DialogAlert innerRef={dialogAlert} buttonLabel={t('ok')} />
    </Grid>
  );
};

export default CreateMobileIcons;
