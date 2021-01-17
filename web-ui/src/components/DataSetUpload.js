import React, { useState, useEffect } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => createStyles({
  divWrapper: {
    display: 'inline-block'
  },
  dropzone: {
    display: 'flex'
  },
  previewChip: {
    marginLeft: 5,
    minWidth: 160,
    maxWidth: 210,
    float: 'right'
  },
  displayButton: {
    marginTop: 5,
    float: 'left'
  }
}));


const DataSetUpload = (props) => {

  const { displayData, dataFiles } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  //const [files, setFiles] = useState([]);

  const handleDiaplayData = () => {
    displayData(true);
  }

  const handleUploadFile = (upload) => {
    dataFiles(upload);
    setOpen(upload.length > 0);
  }
  
  return (
      <div className={classes.divWrapper}>
        <div className={classes.dropzone}>
          <DropzoneArea
            onChange={(files) => handleUploadFile(files)}
            showPreviews={true}
            showPreviewsInDropzone={false}
            useChipsForPreview
            previewGridProps={{container: { spacing: 1, direction: 'row' }}}
            previewChipProps={{classes: { root: classes.previewChip } }}
            previewText=""
            filesLimit={1}
            acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
            maxFileSize={15000000} // 15MB
          />
        </div>
        <div className={classes.displayButton}>
          {
            open ? (<Button color='primary' onClick={handleDiaplayData}>Display data</Button>) : (<div></div>)
          }
          
        </div>
      </div>
  );
}

export default DataSetUpload;