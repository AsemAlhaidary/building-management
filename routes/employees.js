const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:id/', security.checkAuthenticated, async (req, res) => {
  const { id } = req.params;

  const employees = await dbService.getEmployeesByProjectId(id);
  console.log(employees)

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

module.exports = router;