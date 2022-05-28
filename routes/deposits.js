const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  let deposits = await dbService.getDepositsByProjectId(projectId);

  deposits.forEach(deposit => {
    deposit.deposit_date = tools.getStandardDate(deposit.deposit_date);
  });

  res.render('deposits/index', { deposits: deposits, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const employees = await dbService.getEmployeesByProjectId(projectId);

  const methods = ['صرف', 'قبض'];

  res.render('deposits/new', { employees: employees, methods: methods, projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const depositMethod = req.body.depositMethod;
    const depositDate = req.body.depositDate;
    let depositPrice = req.body.depositPrice;
    const { projectId } = req.params;

    const employeeBalance = (await dbService.getEmployeeById(employeeId)).employee_total;
    const depositsSum = (await dbService.calculateDepositsByEmployeeId(employeeId)).sum;
    const totalEmployeeBalance = employeeBalance + depositsSum;

    if (depositMethod == 'صرف') {
      depositPrice *= -1;

      if (totalEmployeeBalance - (depositPrice * -1) >= 0) {
        await dbService.addNewDeposit(depositMethod, depositDate, depositPrice, employeeId);
        res.redirect('/deposits/' + projectId);
      } else {
        req.flash('error', 'لقد تجاوزت المبلغ المتاح لك')
        res.redirect('/deposits/' + projectId + '/new');
      }

    } else {
      await dbService.addNewDeposit(depositMethod, depositDate, depositPrice, employeeId);
      res.redirect('/deposits/' + projectId);
    }

  } catch (error) {
    console.log(error);
    res.redirect('/deposits/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, depositId } = req.params;

    const result = await dbService.deleteDepositById(depositId);

    if (result) res.redirect('/deposits/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:depositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, depositId } = req.params;

    let deposit = await dbService.getDepositBytId(depositId);
    deposit.deposit_date = tools.getStandardDate(deposit.deposit_date);

    res.render('deposits/info', { deposit: deposit, projectId: projectId } );
  } catch (error) {
    console.log(error);
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