const express = require('express');
const security = require('../security/security');
const router = express.Router();

router.get('/', security.checkAuthenticated, (req, res) => {
  res.render('depordis/index', { depordis: 'depordis' });
});

router.get('/new', security.checkAuthenticated, (req, res) => {
  res.render('depordis/new');
});

router.post('/create', security.checkAuthenticated, (req, res) => {
  res.send('Create');
})

module.exports = router;