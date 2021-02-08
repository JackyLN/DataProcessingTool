import React from 'react';
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
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

import FileSaver from 'file-saver';

const config = require('../config');
const useStyles = makeStyles({
  center: {
    alignItems: 'center',
  },
  parentContentDialog: {
    width: '100%',
    textAlign: 'center'
  },
  childCpntentDialog: {
    display: 'inline',
    margin: '2px'
  }

});

const DownloadDialog = (props) => {
  const classes = useStyles();
  const { open, onClose, link } = props;

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
        <DialogTitle id="alert-dialog-title">{"Click to Download file"}</DialogTitle>
        <DialogContent className={classes.parentContentDialog}>
          <IconButton
            onClick={handleDownload}
            color="primary"
            aria-label="upload picture"
            className={classes.childCpntentDialog}>
            <CloudDownloadOutlinedIcon style={{ fontSize: 60 }}/>
          </IconButton>
          
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