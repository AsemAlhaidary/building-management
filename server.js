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
const contractorsRouter = require('./routes/contractors');
const contractorsDepo = require('./routes/contractorsdepo');
const managersRouter = require('./routes/managers');
const purchasesRouter = require('./routes/purchases');
const outlaysRouter = require('./routes/outlays');
const equipmentsRouter = require('./routes/equipments');
const invoicesRouter = require('./routes/invoices');
const extrasRouter = require('./routes/extras');
const depositsRouter = require('./routes/deposits');
const deportesRouter = require('./routes/deportes');
const paymentsrecivesRouter = require('./routes/paymentsrecives');
const reportsRouter = require('./routes/reports');

const app = express();

// Let the server know we are using 'ejs'
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
// Let the server know we are are getting informations from forms
// to able to access them isnide 'req' variable
app.use(express.urlencoded({ extended: false }));
// app.use(express.cookieParser('keyboard cat'));
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
app.use('/contractors', contractorsRouter);
app.use('/contractorsdepo', contractorsDepo);
app.use('/managers', managersRouter);
app.use('/purchases', purchasesRouter);
app.use('/outlays', outlaysRouter);
app.use('/equipments', equipmentsRouter);
app.use('/extras', extrasRouter);
app.use('/deposits', depositsRouter);
app.use('/invoices',invoicesRouter);
app.use('/paymentsrecives',paymentsrecivesRouter);
app.use('/deportes', deportesRouter);
app.use('/reports', reportsRouter);

app.listen(process.env.PORT || process.env.LISTEN_PORT, () => {
  console.log('app is listening on: http://localhost:3000/');
});