const express = require('express');
const security = require('../security/security');
const passport = require('passport');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/', security.checkAuthenticated, async (req, res) => {
  const projects = await dbService.getAllProjects();

  res.render('projects/index', { projects: projects });
});

router.get('/new', security.checkAuthenticated, (req, res) => {
  res.render('projects/new');
});

router.post('/create', security.checkAuthenticated, async (req, res) => {
  try {
    const projectName = req.body.projectName;
    const projectAddress = req.body.projectAddress;
    const projectStartDate = req.body.projectStartDate;
    const projectEndDate = req.body.projectEndDate;
    const userId = passport.session.user.id;
    console.log(projectName)

    await dbService.addNewProject(projectName, projectAddress, projectStartDate, projectEndDate, userId);

    res.redirect('/projects');
  } catch (error) {
    console.log(error.message);
    res.redirect('/projects/new');
  }
});

router.get('/edit/:id', security.checkAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await dbService.getProjectById(id);

    res.render('projects/edit', { project: project});
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/edit/:id', security.checkAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const nProjectName = req.body.projectName;
    const nProjectAddress = req.body.projectAddress;
    const nProjectStartDate = req.body.projectStartDate;
    const nProjectEndDate = req.body.projectEndDate;

    const result = await dbService.editProjectById(id, nProjectName, nProjectAddress, nProjectStartDate, nProjectEndDate);
    console.log(result)

    res.redirect('/projects');
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/open/:id', security.checkAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await dbService.getProjectById(id);

    res.render('employees/index', { project: project});
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/delete/:id', security.checkAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await dbService.deleteProjectById(id);

    if (result) res.redirect('/projects');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;