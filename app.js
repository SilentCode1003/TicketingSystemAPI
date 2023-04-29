var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
const mysql = require('./routes/repository/ticketingdb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var clientRouter = require('./routes/client');
var concernRouter = require('./routes/concern');
var departmentRouter = require('./routes/department');
var personelRouter = require('./routes/personel');
var positionRouter = require('./routes/position');
var priorityRouter = require('./routes/priority');
var rolesRouter = require('./routes/roles');
var urgencyRouter = require('./routes/urgency');
var locationRouter = require('./routes/location');
var statusRouter = require('./routes/status');
var issueRouter = require('./routes/issue');
var assignticketRouter = require('./routes/assignticket');
var dueRouter = require('./routes/due');
var filterRouter = require('./routes/filter');
var ticketcommentRouter = require('./routes/ticketcomment');



var app = express();

//mongodb
mongoose.connect('mongodb://localhost:27017/Ticketing')
  .then((res) => {
    console.log("MongoDB Connected!");
  });

const store = new MongoDBSession({
  uri: 'mongodb://localhost:27017/Ticketing',
  collection: 'TicketingSessions',
});

//Session
app.use(
  session({
    secret: "5L Secret Key",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//Check SQL Connection
mysql.CheckConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/client', clientRouter);
app.use('/concern', concernRouter);
app.use('/department', departmentRouter);
app.use('/personel', personelRouter);
app.use('/position', positionRouter);
app.use('/priority', priorityRouter);
app.use('/roles', rolesRouter);
app.use('/urgency', urgencyRouter);
app.use('/location', locationRouter);
app.use('/status', statusRouter);
app.use('/issue', issueRouter);
app.use('/assignticket', assignticketRouter);
app.use('/due', dueRouter);
app.use('/filter', filterRouter);
app.use('/ticketcomment', ticketcommentRouter);

app.use(cors({
  origin: '*', // allow only requests from this domain
  methods: ['GET', 'POST'], // allow only these HTTP methods
  // allowedHeaders: ['Content-Type'] // allow only these headers
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
