const express = require('express');
const security = require('../security/security');
const router = express.Router();

router.get('/', security.checkAuthenticated, (req, res) => {
  res.render('employees/index', { employees: 'employees' });
});

router.get('/new', security.checkAuthenticated, (req, res) => {
  res.render('employees/new');
});

router.post('/create', security.checkAuthenticated, (req, res) => {
  res.send('Create');
})

module.exports = router;