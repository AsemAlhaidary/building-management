const express = require('express');
const security = require('../security/security');
const passport = require('passport');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/', security.checkAuthenticated, (req, res) => {
  res.redirect('/projects');
  // res.redirect('/dashboard');
});

router.get('/dashboard', security.checkAuthenticated, (req, res) => {
  res.render('index', { user: passport.session.user });
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;