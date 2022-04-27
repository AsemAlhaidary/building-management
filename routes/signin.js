const express = require('express');
const security = require('../security/security');
const bcrypt = require('bcrypt');
// const passport = require('passport');
const database = require('../models/database');
const router = express.Router();

router.get('/', security.checkNotAuthenticated, (req, res) => {
  res.render('signin');
});

router.post('/', security.checkNotAuthenticated, async (req, res) => {
  try {
    const dbService = database.getDbServiceInstance();

    const hashedUsername = await bcrypt.hash(req.body.username, 10);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    dbService.insertUser(req.body.name, hashedUsername, hashedPassword);

    res.redirect('/login');
  } catch (error) {
    res.redirect('/signin');
  }
});

module.exports = router;