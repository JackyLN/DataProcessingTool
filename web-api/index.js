const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config')

const port = config.server.APPLICATION_PORT;

//MongoDB
var mongoose = require('mongoose');
mongoose.connect(config.server.APPLICATION_MONGOOSE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.once('open', () => console.log('connected to database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/api/stripegateway/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
)

app.get('/', function (req, res) {
  res.send('Helloworld');
})

//API router
//Admin router
const AdminRouter = require('./src/services/AdminServices');
app.use('/admin', AdminRouter); //Use cors on single route, use //app.use(cors()); to enable every request

//Client router
const ClientRouter = require('./src/services/ClientServices');
app.use('/client', ClientRouter);

//Stripe router
const StripeRouter = require('./src/services/StripesServices');
app.use('/stripegateway', StripeRouter);


//App Start
app.listen(port, () => console.log(`API running on PORT ${port}!`))