const express = require('express');
const security = require('../security/security');
const session = require('express-session');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/', security.checkAuthenticated, (req, res) => {
  res.redirect('/dashboard');
});

router.get('/dashboard', security.checkAuthenticated, (req, res) => {
  res.render('index', { name: req.body.username });
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;