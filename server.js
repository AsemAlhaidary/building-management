if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const stylus = require('stylus');
const nib = require('nib');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signinRouter = require('./routes/signin');
const security = require('./security/security');
const database = require('./models/database');

const app = express();

function compile(str, path) {
  return stylus(str).set('style', path).use(nib());
}

// Let the server know we are using 'ejs'
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
// Let the server know we are are getting informations from forms
// to able to access them isnide 'req' variable
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(stylus.middleware({ 
  src: __dirname + '/public/css',
  compile: compile
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signin', signinRouter);

app.listen(process.env.PORT || 3000);