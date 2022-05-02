const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const employees = await dbService.getEmployeesByProjectId(projectId);

  res.render('employees/index', { employees: employees, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('employees/new', { projectId: projectId });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeName = req.body.employeeName;
    const employeeJob = req.body.employeeJob;
    const employeePhoneNum = req.body.employeePhoneNum;
    const { projectId } = req.params;

    await dbService.addNewEmployee(employeeName, employeeJob, employeePhoneNum, projectId);

    res.redirect('/employees/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/employees/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,employeeId } = req.params;

    const result = await dbService.deleteEmployeeById(employeeId);

    if (result) res.redirect('/employees/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/open', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId } = req.params;

    res.redirect('/employees/' + projectId );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,employeeId } = req.params;

    const employee = await dbService.getEmployeeById(employeeId);

    res.render('employees/edit', { employee: employee, projectId: projectId});
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId } = req.params;
    const nProjectName = req.body.projectName;
    const nProjectAddress = req.body.projectAddress;
    const nProjectStartDate = req.body.projectStartDate;
    const nProjectEndDate = req.body.projectEndDate;

    const result = await dbService.editProjectById(projectId, nProjectName, nProjectAddress, nProjectStartDate, nProjectEndDate);

    res.redirect('/projects');
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;