/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import {
  setLastSourceRenameFolder, getLastSourceRenameFolder,
  setLastDestinationRenameFolder, getLastDestinationRenameFolder
} from '../storage/RenameTabData';

import { sendGetFolderFilesRequest, sendRename } from '../network/api';

import FileChooser from '../components/FileChooser';
import ReactVirtualizedTable from '../components/ReactVirtualizedTable';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const columns = [
  {
    width: 50,
    label: 'isSelected',
    dataKey: 'isSelected',
    isCheckBox: true,
  },
  {
    width: 320,
    label: 'Old file',
    dataKey: 'base',
    numeric: true,
  },
  {
    width: 520,
    label: 'New Name',
    dataKey: 'newName',
    numeric: true,
  },
];
function RenameTab() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [src, setSrc] = useState(getLastSourceRenameFolder(''));
  const [des, setDes] = useState(getLastDestinationRenameFolder(''));
  const [files, setFiles] = useState([]);
  const [oldName, setOldName] = useState([]);
  const [newName, setNewName] = useState([]);

  useEffect(() => {
    if (src)
      handleGetSourceFolder(src);
  }, [src]);

  const handleChangeDes = (destination) => {
    setDes(destination);
    setLastDestinationRenameFolder(des);
  };

  const handleGetSourceFolder = async (source) => {
    const response = await sendGetFolderFilesRequest(source);
    // console.log('response Not null', source, response);
    setFiles(response);
    setSrc(source);
    setLastSourceRenameFolder(source);
  };

  const handleRename = () => {
    if (!oldName || !newName) {
      console.log('Not null');
      return;
    }
    const selected = files.filter(f => f.isSelected);
    if (!selected.length) {
      console.log('Please select file!');
      return;
    }
    sendRename(selected, src, des, oldName, newName).then(response => {
      handleGetSourceFolder(src);
      return response;
    }).catch();
  };

  const onRowClick = ({ index }) => {
    // console.log('Please select index!',index, files);
    files[index].isSelected = !files[index].isSelected;
    setFiles(files);
  };

  return (
    <Grid container spacing={4}>
      <Grid item lg={4}>
        <Paper>
          <Grid container>
            <Grid item lg={12}>
              <FileChooser
                isFolder
                onChosenFolder={handleGetSourceFolder}
                fileFolder={src}
                label={t('source_folder')}
                title={t('title_source')}
              />
            </Grid>
            <Grid item lg={12}>
              <FileChooser
                isFolder
                onChosenFolder={handleChangeDes}
                fileFolder={des}
                label={t('destination_folder')}
                title={t('title_des')}
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                label={t("old_name")}
                placeholder=".js"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={evt => setOldName(evt.target.value)}
                defaultValue={oldName}
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                label={t("new_name")}
                placeholder=".ts"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={evt => setNewName(evt.target.value)}
                defaultValue={newName}
              />
            </Grid>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleRename}
            >Rename
            </Button>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <ReactVirtualizedTable
          columns={columns}
          rows={files}
          onRowClick={onRowClick}
        />
      </Grid>
    </Grid>
  );
}

export default RenameTab;
