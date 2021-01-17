import React, { useState } from "react";
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Papa from 'papaparse';

import Copyright from '../components/Copyright';

import HeaderDrawer from '../components/HeaderDrawer';
import DataSetUpload from '../components/DataSetUpload';
import AlertDialog from '../components/AlertDialog';


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
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [page, setPage] = useState(0);
  const [displayPageData, setDisplayPageData] = useState([]);


  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  
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
      /* Further implementation -> using step
      step: function(results, parser) {

        if(columns.length ==0) {
          let columns = [];
          results.meta["fields"].map((d, key) => {
            columns.push({
              id: "col_" + key,
              index: key,
              label: d
            });
          });
          columns.splice(1, 0, "predict_label");
          setColumns(columns);
        }

        const url = `http://localhost:2301` + `/upload`
        window.fetch(url, {
          method: 'post',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(results.data)
        }).then(function(response) {
          const status = response.status;
          if(status != 200) {
            console.log("Error");
            return ;
          } else {
            return response.json();
          }
        })
        .then(json => {
          if(json && json.status == 200) {
            let hash = Object.create(null);
          
            json.data.map(j => {
              hash[j.id] = { id: j.id, predict_label: j.predict_label };
            });
            let data_with_prediction = results.data.map(r => {
              if (hash[r.id]) {
                r.predict_label = hash[r.id].predict_label;
              }
            });
            setData([... data, data_with_prediction]);
          } else {
           console.log(json);
          }
        });
        //console.log(results);
        
      },
      */
      complete: (results, files) => {

        let columns = [];
        results.meta["fields"].map((d, key) => {
          columns.push({
            id: "col_" + d,
            index: d,
            label: d
          });
        });
        columns.splice(1, 0, {
          id: "col_" + "predict_label",
          label: "predict_label",
          style: classes.predict_label
        });
        setColumns(columns);

        //const items = results.data.slice(0, 10);
        //localStorage.setItem('mydata', JSON.stringify(items));
        

        //Remove line break csv file (mixing between \r and \r\n Linux vs Windows)
        const re = /\r\n|\r|\n/;

        for (var key in results.data[results.data.length-1]) {
          if(re.test(results.data[results.data.length-1][key])) {
            results.data = results.data.splice(0, results.data.length-1);
            break;
          }
        }
      
        //let count = 1;
        //while(count < results.data.length) {
       // while(count < 100) {
          //let processdata = results.data.splice(count, count + 3000);

          const url = config.api.API_DOMAIN + `/upload`
          window.fetch(url, {
            method: 'post',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(results.data)
          }).then(function(response) {
            const status = response.status;
            if(status != 200) {
              throw new Error();
            } else {
              return response.json();
            }
          })
          .then(json => {
            if(json) {
              let hash = Object.create(null);
              let data_with_prediction= [];
              json.map(j => {
                hash[j.id] = { predict_label: j.predict_label };
              });
              results.data.map(r => {
                if (hash[r.id]) {
                  data_with_prediction.push({
                    ...r, predict_label: hash[r.id].predict_label
                  });
                }
              });
              return data_with_prediction;
            } else {
              throw new Error();
            }
          })
          .then(dip => {
            if(dip) {
              if(data.length >0) {
                setData(c=> [...c, dip]);
                setDisplayPageData(calculateDisplayPageData(dip, page, rowsPerPage));
              } else {
                setData(dip);
                setDisplayPageData(calculateDisplayPageData(dip, page, rowsPerPage));
              }
              console.log(dip);
            } else {
              throw new Error();
            }
          })
          .finally(() => {
            setIsBusy(false);
            console.log('final');
            console.log(data);
            console.log(displayPageData);
            console.log("end");
          })
          .catch(() => {
            setOpenAlert(true);
            setMessageAlert("Invalid file - Please upload a vectorised data");
          })
          //count = count + 100;
        //}
        
        //setData(results.data);
        
        //console.log(columns);
        //console.log(results.data);  
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
      </main>
    </div>
  )
}

export default Upload;