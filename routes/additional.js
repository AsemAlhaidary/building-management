const express = require('express');
const security = require('../security/security');
const router = express.Router();

router.get('/', security.checkAuthenticated, (req, res) => {
  res.render('additional/index', { additional: 'additional' });
});

router.get('/new', security.checkAuthenticated, (req, res) => {
  res.render('additional/new');
});

router.post('/create', security.checkAuthenticated, (req, res) => {
  res.send('Create');
})

module.exports = router;