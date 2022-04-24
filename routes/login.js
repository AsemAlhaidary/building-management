const express = require('express');
const security = require('../security/security');
const passport = require('passport');
const router = express.Router();

router.get('/', security.checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/', security.checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;