import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  CssBaseline,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Paper,
  Toolbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import HeaderDrawer from '../components/HeaderDrawer';
import Title from '../components/Title';
import { mainListItems, secondaryListItems } from '../components/LeftDrawer';
import ChartDataImport from '../components/ChartDataImport';
import SummaryDataImport from '../components/SummaryDataImport';
import Copyright from '../components/Copyright';

import config from '../config';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    display: 'flex'
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  fixedHeight: {
    height: 300,
  },

  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    flexShrink: 0
  }
}));

const Home = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
  });

  return(
    <div className={classes.root}>
      <CssBaseline />
      <HeaderDrawer />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <ChartDataImport />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <SummaryDataImport />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Box className={classes.footer}>
          <Copyright />
        </Box>
      </main>
    </div>
  )
}


export default Home;