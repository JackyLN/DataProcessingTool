import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography
 } from '@material-ui/core/'
import { blue } from '@material-ui/core/colors'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

import FileSaver from 'file-saver';

const config = require('../config');
const useStyles = makeStyles({
 
});

const DownloadDialog = (props) => {
  const { open, onClose, message, link } = props;


  const handleClose = () => {
    onClose(true);
  };

  const handleDownload = () => {    
    const url = config.api.API_DOMAIN + `/file/download?file=` + link;
    FileSaver.saveAs(url, link);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <IconButton onClick={handleDownload} color="primary" aria-label="upload picture">
              <CloudDownloadOutlinedIcon />
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DownloadDialog;