import React from 'react';
import {
  Typography,
  Link
} from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://jackylenghia.com">
        Jacky Le
      </Link>{' '}
      {' © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;