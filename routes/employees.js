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

  res.render('employees/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeName = req.body.employeeName;
    const employeeJob = req.body.employeeJob;
    const employeePhoneNum = req.body.employeePhoneNum;
    const employeeDayPrice = req.body.employeeDayPrice;
    const employeeWorkStart = req.body.employeeWorkStart;
    const employeeWorkEnd = req.body.employeeWorkEnd;
    const employeeTotal = getPeriod(req.body.employeeWorkStart, req.body.employeeWorkEnd) * employeeDayPrice;
    const { projectId } = req.params;

    await dbService.addNewEmployee(employeeName, employeeJob, employeePhoneNum, employeeDayPrice, employeeWorkStart, employeeWorkEnd, employeeTotal, projectId);

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

router.get('/:projectId/info/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;

    const employee = await dbService.getEmployeeById(employeeId);

    res.render('employees/info', { employee: employee, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/info/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;

    const employee = await dbService.getEmployeeById(employeeId);

    res.redirect('/employees/' + projectId );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,employeeId } = req.params;

    const employee = await dbService.getEmployeeById(employeeId);

    res.render('employees/edit', { employee: employee, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;
    const nEmployeeName = req.body.employeeName;
    const nEmployeeJob = req.body.employeeJob;
    const nEmployeePhoneNum = req.body.employeePhoneNum;
    const nEmployeeDayPrice = req.body.employeeDayPrice;
    const nEmployeeWorkStart = req.body.employeeWorkStart;
    const nEmployeeWorkEnd = req.body.employeeWorkEnd;
    const nEmployeeTotal = getPeriod(req.body.employeeWorkStart, req.body.employeeWorkEnd) * nEmployeeDayPrice;

    await dbService.editEmployeeById(employeeId, nEmployeeName, nEmployeeJob, nEmployeePhoneNum, nEmployeeDayPrice, nEmployeeWorkStart, nEmployeeWorkEnd, nEmployeeTotal);

    res.redirect('/employees/' + projectId);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:projectId/report/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;

    const result = await dbService.editEmployeeById(employeeId, nEmployeeName, nEmployeeJob, nEmployeePhoneNum);

    res.redirect('/employees/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

function getPeriod (fDate, sDate) {
  const firstDate = new Date(fDate);
  const lastDate = new Date(sDate);

  const periodMs = lastDate.getTime() - firstDate.getTime();

  period = Math.floor(periodMs / 1000 / 60 / 60 / 24);

  return period;
}

module.exports = router;