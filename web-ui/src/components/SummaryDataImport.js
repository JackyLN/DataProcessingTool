import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  maindata: {
    verticalAlign: 'middle',
  }
});

const SummaryDataImport = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title isGutter={true}>Total Data Imported</Title>
      <Typography component="p" variant="h4" className={classes.maindata}>
        30,024
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        till 23 Sepember, 2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Report
        </Link>
      </div>
    </React.Fragment>
  );
}

export default SummaryDataImport;