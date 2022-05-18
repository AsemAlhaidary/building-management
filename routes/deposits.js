const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const deposits = await dbService.getDepositsByProjectId(projectId);

  res.render('deposits/index', { deposits: deposits, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const employees = await dbService.getEmployeesByProjectId(projectId);

  res.render('deposits/new', { employees: employees, projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const depositDate = req.body.depositDate;
    const depositTime = req.body.depositTime;
    const depositTimePrice = req.body.depositTimePrice;
    const depositTotalPrice = depositTime * depositTimePrice;
    const { projectId } = req.params;

    await dbService.addNewDeposit(depositDate, depositTime, depositTimePrice, depositTotalPrice, employeeId);

    res.redirect('/deposits/' + projectId);
  } catch (error) {
    console.log(error);
    res.redirect('/deposits/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,depositId } = req.params;

    const result = await dbService.deletedepositById(depositId);

    if (result) res.redirect('/depositss/' + projectId);
  } catch (error) {deposits
    console.log(error.message);
  }
});

router.get('/:projectId/info/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, depositId } = req.params;

    const deposit = await dbService.getPurchaseById(depositId);

    res.render('deposits/info', { deposit: deposit, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/info/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, depositId } = req.params;

    const deposit = await dbService.getdepositById(depositId);

    res.redirect('/deposits/' + projectId );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,depositId } = req.params;

    constdeposit = await dbService.getdepositById(depositId);

    res.render('deposits/edit', { deposit: deposit, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const depositName = req.body.depositName;
    const depositUnitPrice = req.body.getdepositByIdUnitPrice;
    constdepositUnitQuantity = req.body.getdepositByIdUnitQuantity;
    const depositTotal = depositUnitPrice * depositUnitQuantity;
    constdepositType = req.body.depositType;
    const depositDetails = req.body.depositeDetails;
    const { projectId, depositId } = req.params;

    const result = await dbService.editdepositById(depositName, depositUnit, depositeUnitPrice, depositUnitQuantity, depositTotal,depositType,depositDetails, depositId);

    res.redirect('/deposits/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId,depositId } = req.params;

    const result = await dbService.editdepositById(depositId, ndepositName, ndepositeJob, ndepositPhoneNum);

    res.redirect('/deposits/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;