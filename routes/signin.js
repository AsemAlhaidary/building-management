const express = require('express');
const security = require('../security/security');
const bcrypt = require('bcrypt');
const database = require('../models/database');
const router = express.Router();

router.get('/', security.checkNotAuthenticated, (req, res) => {
  res.redirect('/login');
  // res.render('signin', { label: false });
});

router.post('/addUser', security.checkNotAuthenticated, async (req, res) => {
  try {
    const dbService = database.getDbServiceInstance();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await dbService.addNewUser(req.body.name, req.body.username, hashedPassword);

    res.redirect('/login');
  } catch (error) {
    res.redirect('/signin');
  }
});

module.exports = router;