import React, { useState, useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
import { makeStyles } from '@material-ui/core/styles';


import Title from './Title'


const useStyles = makeStyles((theme) => ({
  divWrapper: {
    display: 'inline-block'
  }
}));

const data = {
  labels: ['Nov-2020', 'Dec-2020', 'Jan-2021', 'Feb-2021', 'March-2021', 'Apr-2021', 'May-2021', 'Jun-2021','Jul-2021'],
  datasets: [
    {
      label: 'Dataset import',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(63,81,181,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(63,81,181,1)',
      pointBackgroundColor: 'rgba(63,81,181,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,8,63,1)',
      pointHoverBorderColor: 'rgba(255,8,63,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 94, 102]
    }
  ]
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 2,
}

const chartConfig = {
  type: 'line',
  data: data,
  options: options
}

const ChartDataImport = () => {

  const classes = useStyles();

  const dataChart = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);


  useEffect(() => {
    if (dataChart && dataChart.current) {
      const newChartInstance = new Chartjs(dataChart.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [dataChart]);

  // //const myChartRef = this.chartRef.current.getContext("2d");
  // let lineChart = new Chart(dataChart, {
  //   type: 'line',
  //   data: data,
  //   options: options
  // });
  return(
    <div className={classes.divWrapper}>
      <Title isGutter={true}>Data Imported</Title>
      <canvas ref={dataChart} />
    </div>
  )
}

export default ChartDataImport;

/* After Initialization
const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    const data = [1, 2, 3, 4, 5, 6];
    updateDataset(0, data);
  };
  */