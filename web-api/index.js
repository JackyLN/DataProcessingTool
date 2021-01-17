const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const config = require('./config')

const port = config.server.APPLICATION_PORT;

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.get('/', function (req, res) {
  res.send('API - Data Processing');
})

//API router
//Client router
const ClientRouter = require('./src/services/ClientServices');
app.use('/client', ClientRouter);

//App Start
app.listen(port, () => console.log(`API running on PORT ${port}!`))