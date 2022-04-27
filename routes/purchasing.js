const express = require('express');
const security = require('../security/security');
const router = express.Router();

router.get('/', security.checkAuthenticated, (req, res) => {
  res.render('purchasing/index', { purchasing: 'purchasing' });
});

router.get('/new', security.checkAuthenticated, (req, res) => {
  res.render('purchasing/new');
});

router.post('/create', security.checkAuthenticated, (req, res) => {
  res.send('Create');
})

module.exports = router;