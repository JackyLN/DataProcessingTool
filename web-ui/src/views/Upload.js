import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import {
  Box,
  CssBaseline,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Papa from 'papaparse';

import Copyright from '../components/Copyright';

import HeaderDrawer from '../components/HeaderDrawer';
import DataSetUpload from '../components/DataSetUpload';
import AlertDialog from '../components/AlertDialog';
import DownloadDialog from '../components/DownloadDialog';



const config = require('../config');


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
    display: 'flex',
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
  containerHide: {
    display: 'none'
  },
  containerShow: {
    display: 'block'
  },
  footer: {
    flexShrink: 0,
  },
  predict_label: {
    backgroundColor: "#E57373",
    color: "white"
  }
}));

const Upload = () => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [displayData, setDisplayData] = useState(false);
  const [files, setFiles] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  //For pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [displayPageData, setDisplayPageData] = useState([]);


  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  
  const [openDownloadAlert, setOpenDownloadAlert] = useState(false);
  const [linkDownload, setLinkDownload] = useState("");
  
  //const [emptyRows, setEmptyRows] = useState(0);

  const handleFiles = (display) => {
    setDisplayData(display);

    setIsBusy(true);

    setTimeout(() => {
      processData();
    }, 1200)
  }

  const handleChangePage = (event, newPage) => {
    setIsBusy(true);
    setPage(newPage);

    setDisplayPageData(calculateDisplayPageData(data, newPage, rowsPerPage));

    setTimeout(() => {
      setIsBusy(false);
    }, 1200)
    
  };

  const handleChangeRowsPerPage = (event) => {
    setIsBusy(true);

    const _rows = parseInt(event.target.value, 10);

    setRowsPerPage(_rows);
    setPage(0);

    setDisplayPageData(calculateDisplayPageData(data, 0, _rows));

    setTimeout(() => {
      setIsBusy(false);
    }, 1200)
  };


  const handleCloseAlert = (value) => {
    setOpenAlert(false);
    setOpenDownloadAlert(false);
  };

  const calculateDisplayPageData = (_data, _page, _rowsPerPage) => {
    return _data.slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage);
  }

  const processData = () => {
    Papa.parse(files[0], {
      //woker: true,
      header: true,
      skipEmptyLines: true,
      newline: "",
      delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
      
      error: (err, file, inputElem, reason) => {
        // executed if an error occurs while loading the file,
        // or if before callback aborted for some reason
        console.log(err);
      },
      complete: (results, files) => {

        //columns handling
        let tmpColumns = [];
        results.meta["fields"].map((d, key) => {
          tmpColumns.push({
            id: "col_" + d,
            index: d,
            label: d
          });
        });
        setColumns(tmpColumns);


        //Remove line break csv file (mixing between \r and \r\n Linux vs Windows)
        const re = /\r\n|\r|\n/;

        for (var key in results.data[results.data.length-1]) {
          if(re.test(results.data[results.data.length-1][key])) {
            results.data = results.data.splice(0, results.data.length-1);
            break;
          }
        }

        //POST DATA
        const url = config.api.API_DOMAIN + `/file/upload`;
        const postData = {
          file: results.data,
          name: files.name
        }

        window.fetch(url, {
          method: 'post',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(postData)
        }).then((response) => {
          const status = response.status;
          if(status !== 200) {
            throw new Error();
          } else {
            return response.json();
          }
        }).then((link) => {
          setOpenDownloadAlert(true);
          setLinkDownload(link.data);
        }).finally(() => {
          setData(results.data);
          setDisplayPageData(calculateDisplayPageData(results.data, page, rowsPerPage));
          setIsBusy(false);

        }).catch((ex) => {
          setOpenAlert(true);
          setMessageAlert("Invalid file - Please upload a vectorised data");
          console.log(ex);
        });
      }
    });
  }

  return(
    <div className={classes.root}>
      <CssBaseline />
      <HeaderDrawer />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <DataSetUpload dataFiles={ dataFiles => setFiles(dataFiles)} displayData={ displayData => handleFiles(displayData)} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={12} lg={12} className={displayData ? classes.containerShow : classes.containerHide}>
              <Paper className={classes.paper}>
                {
                  isBusy ? (<LinearProgress />) : (
                    <div>
                      <TableContainer>
                        <Table
                          stickyHeader
                          aria-label="sticky table"
                          size="small"
                        >
                          <TableHead>
                            <TableRow>
                            {
                              columns && columns.map((col) => (
                                <TableCell
                                  key={col.id}
                                  className={col.style}
                                >
                                  {col.label}
                                </TableCell>
                            ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {
                            displayPageData && displayPageData.map( (d, i)=> {
                              return (
                                <TableRow hover key={i}>
                                {
                                  columns.map(col => {
                                    let value = d[col.label];
                                    return (
                                      <TableCell className={col.style} key={col.id }>{value}</TableCell>
                                    )
                                  })}
                                </TableRow>
                              )
                            })
                          }
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                          rowsPerPageOptions={[5,10,30,50]}
                          component="div"
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    </div>
                  )
                }
              </Paper>
            </Grid>

          </Grid>
        </Container>
        <Box>
          <Copyright />
        </Box>
        
        <AlertDialog open={openAlert} onClose={handleCloseAlert} message={messageAlert} />
        <DownloadDialog open={openDownloadAlert} onClose={handleCloseAlert} link={linkDownload} />
      </main>
    </div>
  )
}

export default Upload;