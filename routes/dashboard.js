const express = require('express');
const security = require('../security/security');
const router = express.Router();

router.get('/', security.checkAuthenticated, (req, res) => {
  res.redirect('/dashboard');
});

router.get('/dashboard', security.checkAuthenticated, (req, res) => {
  res.render('index', { name: 'Asem' });
});

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;