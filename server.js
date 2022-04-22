if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

// Store the users inside a local variables instead of database
// temporarily for development purposes
const users = [];

initializePassport(passport, 
  username => users.find(user => user.username === username),
  id => users.find(user => user.username === id)
);

// Let the server know we are using 'ejs'
app.set('view-engine', 'ejs');
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

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: 'Asem' });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

app.get('/signin', checkNotAuthenticated, (req, res) => {
  res.render('signin.ejs');
});

app.post('/signin', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch (error) {
    res.redirect('/signin');
  }
  console.log(users);
});



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
}

app.listen(3000);