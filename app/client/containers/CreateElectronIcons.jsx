import React, { useState, useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import FileChooser from '../components/FileChooser';
import PaperDropZone from '../components/PaperDropZone';
import DialogAlert from '../components/DialogAlert';

import { sendCreateElectronIconsRequest } from '../network';
import {
  LastSourceCreateElectronIcons,
  LastDestinationCreateElectronIcons
} from '../storage/CreateElectronIconsData';

const useStyles = makeStyles({
  root: {
    height: '80vh',
  }
});

const CreateElectronIcons = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [src, setSrc] = useState(LastSourceCreateElectronIcons.get(''));
  const [des, setDes] = useState(LastDestinationCreateElectronIcons.get(''));
  const dialogAlert = useRef();

  const onDropIcon = (files) => {
    // console.log(files);
    setSrc(files[0].path);
    LastSourceCreateElectronIcons.set(files[0].path);
  };

  const onChangeDestination = (files) => {
    setDes(files);
    LastDestinationCreateElectronIcons.set(files);
  };

  const onClickCreateIcons = async () => {
    if (!src) {
      dialogAlert.current.showDialog(t('warning'), t('import_source'));
      return;
    }
    if (!des) {
      dialogAlert.current.showDialog(t('warning'), t('import_destination'));
      return;
    }
    // console.log(src, des);
    await sendCreateElectronIconsRequest(src, des);
    dialogAlert.current.showDialog(t('notification'), t('optimize_success'));
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
            onClick={onClickCreateIcons}
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
            onClick={() => onClickCreateIcons()}
          >Create Icons
          </Button>
        </Grid>
      </Grid>
      <DialogAlert innerRef={dialogAlert} buttonLabel={t('ok')} />
    </Grid>
  );
};

export default CreateElectronIcons;
