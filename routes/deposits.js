const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const deposits = await dbService.getDepositsByProjectId(projectId);
  // const deposits = [{
  //   id: 4,
  //   deposit_name: 'Ehab',
  //   deposit_date: '32/6/2022',
  //   deposit_amount: 5000,
  //   }
  // ];

  res.render('deposits/index', { deposits: deposits, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const employees = await dbService.getEmployeesByProjectId(projectId);

  res.render('deposits/new', { employees: employees, projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const purchaseName = req.body.purchaseName;
    const purchaseUnitPrice = req.body.purchaseUnitPrice;
    const purchaseUnitQuantity = req.body.purchaseUnitQuantity;
    const purchasTotal = purchaseUnitPrice * purchaseUnitQuantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId } = req.params;

    await dbService.addNewdeposits(purchaseName, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDetails, projectId);

    res.redirect('/deposits/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/deposits/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,purchaseId } = req.params;

    const result = await dbService.deletePurchaseById(purchaseId);

    if (result) res.redirect('/depositss/' + projectId);
  } catch (error) {deposits
    console.log(error.message);
  }
});

router.get('/:projectId/info/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);

    res.render('purchases/info', { purchase: purchase, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/info/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);

    res.redirect('/purchases/' + projectId );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);

    res.render('purchases/edit', { purchase: purchase, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const purchaseName = req.body.purchaseName;
    const purchaseUnitPrice = req.body.purchaseUnitPrice;
    const purchaseUnitQuantity = req.body.purchaseUnitQuantity;
    const purchasTotal = purchaseUnitPrice * purchaseUnitQuantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId, purchaseId } = req.params;

    const result = await dbService.editPurchaseById(purchaseName, purchaseUnit, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDetails, purchaseId);

    res.redirect('/purchases/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const result = await dbService.editPurchaseById(purchaseId, npurchaseName, npurchaseJob, npurchasePhoneNum);

    res.redirect('/purchases/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;