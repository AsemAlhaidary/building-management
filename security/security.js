const passport = require('passport');

const initializePassport = require('./passport-config');
const database = require('../models/database');
const dbService = database.getDbServiceInstance();

initializePassport.initialize(
  passport, 
  async username => JSON.stringify(await dbService.getUserByUserName(username)),
  async id => JSON.stringify(await dbService.getUserById(id))
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
}

module.exports = {
  initializePassport,
  checkAuthenticated,
  checkNotAuthenticated
}