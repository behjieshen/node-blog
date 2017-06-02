var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = require('monk')('localhost/blog');
var bodyParser = require('body-parser');
var passport = require('passport');
var multer = require('multer');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var port = process.env.PORT || 3000;

var app = express();

app.locals.moment = require('moment');
app.locals.truncateText = function(text, length) {
    var truncatedText = text.substring(0, length);
    return truncatedText;
}

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle file uploads & multipart data
var upload = multer({ dest: './public/images/uploads'});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Express session
app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore(
    { mongooseConnection : mongoose.connection,
      ttl : 2 * 24 * 60* 60 })
}));

// Require configuration declared in passport.js
require('./config/passport')(passport);
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

// Connect flash
app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Make our db accessible to our router
app.use(function(req, res, next) {
    req.db = db;
    next();
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var upload = multer({storage: storage});

var index = express.Router();
require('./routes/index.js')(index, passport);
app.use('/', index);

var posts = express.Router();
require('./routes/posts.js')(posts, passport);
app.use('/master', posts);

app.listen(port);
console.log('Server started on port ' + port);
