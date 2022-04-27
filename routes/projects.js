const express = require('express');
const security = require('../security/security');
const router = express.Router();

router.get('/', security.checkAuthenticated, (req, res) => {
  res.render('projects/index', { projects: 'projects' });
});

router.get('/new', security.checkAuthenticated, (req, res) => {
  res.render('projects/new');
});

router.post('/create', security.checkAuthenticated, (req, res) => {
  res.send('Create');
})

module.exports = router;