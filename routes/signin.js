const express = require('express');
const security = require('../security/security');
const passport = require('passport');
const router = express.Router();

router.get('/', security.checkNotAuthenticated, (req, res) => {
  res.render('signin');
});

router.post('/', security.checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    database.insertUser('null', req.body.name, hashedPassword);
    res.redirect('/login');
  } catch (error) {
    res.redirect('/signin');
  }
});

module.exports = router;