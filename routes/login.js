const express = require('express');
const security = require('../security/security');
const passport = require('passport');
const router = express.Router();

router.get('/', security.checkNotAuthenticated, (req, res) => {
  res.render('login', { label: false, allowSign: false });
});

router.post('/', security.checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;