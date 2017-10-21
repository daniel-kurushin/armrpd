var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');

// *** load environment variables *** //
require('dotenv').config();

var app         = express();
var port        = process.env.PORT || 3000;

//*** cross domain requests
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};
app.use(allowCrossDomain);

//*** get our request parameters
app.use(express.static('app'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//*** log to console
app.use(morgan('dev'));

//*** routes
const docxRoutes = require('./server/js/routes/docx');
const dbRoutes = require('./server/js/routes/queries');
const iasRoutes = require('./server/js/routes/queriesIAS');

//*** register routes
app.use('/docx', docxRoutes)
app.use('/api', dbRoutes);
app.use('/ias', iasRoutes);

//*** Route (GET http://localhost:3000)
app.get('/', function(req, res) {

});

//*** start the server
app.listen(port, function(req, res) {
  console.log('Server is started. Port: ' + port);
});