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
  Typography
 } from '@material-ui/core/'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
 
});

const AlertDialog = (props) => {
  const { open, onClose, message } = props;


  const handleClose = () => {
    onClose(true);
  };

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
          <DialogContentText id="alert-dialog-description">{message}
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

export default AlertDialog;