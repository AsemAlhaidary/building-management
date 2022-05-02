const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:id/', security.checkAuthenticated, async (req, res) => {
  const { id } = req.params;

  const employees = await dbService.getEmployeesByProjectId(id);

  res.render('employees/index', { employees: employees, projectId: id });
});

router.get('/:id/new', security.checkAuthenticated, (req, res) => {
  const { id } = req.params;

  res.render('employees/new', { projectId: id });
});

router.post('/:id/create', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeName = req.body.employeeName;
    const employeeJob = req.body.employeeJob;
    const employeePhoneNum = req.body.employeePhoneNum;
    const { id } = req.params;

    await dbService.addNewEmployee(employeeName, employeeJob, employeePhoneNum, id);

    res.redirect('/employees/' + id);
  } catch (error) {
    console.log(error.message);
    res.redirect('/employees/' + id + '/new');
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

router.post('/:id/open', security.checkAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    res.redirect('/employees/' + id );
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

router.post('/:id/edit', security.checkAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const nProjectName = req.body.projectName;
    const nProjectAddress = req.body.projectAddress;
    const nProjectStartDate = req.body.projectStartDate;
    const nProjectEndDate = req.body.projectEndDate;

    const result = await dbService.editProjectById(id, nProjectName, nProjectAddress, nProjectStartDate, nProjectEndDate);

    res.redirect('/projects');
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;