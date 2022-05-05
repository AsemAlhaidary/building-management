if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const loginRouter = require('./routes/login');
const signinRouter = require('./routes/signin');
const dashboardRouter = require('./routes/dashboard');
const projectsRouter = require('./routes/projects');
const employeesRouter = require('./routes/employees');
const purchasesRouter = require('./routes/purchases');
const extrasRouter = require('./routes/extras');
const depordisRouter = require('./routes/depordis');
const reportsRouter = require('./routes/reports');

const app = express();

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

app.use('/login', loginRouter);
app.use('/signin', signinRouter);
app.use('/', dashboardRouter);
app.use('/projects', projectsRouter);
app.use('/employees', employeesRouter);
app.use('/purchases', purchasesRouter);
app.use('/extras', extrasRouter);
app.use('/depordis', depordisRouter);
app.use('/reports', reportsRouter);

app.listen(process.env.PORT || process.env.LISTEN_PORT);