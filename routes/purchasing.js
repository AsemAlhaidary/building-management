const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const purchasing = await dbService.getPurchasesByProjectId(projectId);

  res.render('purchasing/index', { purchasing: purchasing, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('purchasing/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const purchaseName = req.body.purchaseName;
    const purchaseUnit = req.body.purchaseUnit;
    const purchaseUnitPrice = req.body.purchaseUnitPrice;
    const purchaseUnitQuantity = req.body.purchaseUnitQuantity;
    const purchasTotal = purchaseUnitPrice * purchaseUnitQuantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId } = req.params;

    await dbService.addNewpurchase(purchaseName, purchaseUnit, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDetails, projectId);

    res.redirect('/purchasing/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/purchasing/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,purchaseId } = req.params;

    const result = await dbService.deletePurchaseById(purchaseId);

    if (result) res.redirect('/purchasing/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);

    res.render('purchasing/info', { purchase: purchase, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/info/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);

    res.redirect('/purchasing/' + projectId );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);

    res.render('purchasing/edit', { purchase: purchase, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const purchaseName = req.body.purchaseName;
    const purchaseUnit = req.body.purchaseUnit;
    const purchaseUnitPrice = req.body.purchaseUnitPrice;
    const purchaseUnitQuantity = req.body.purchaseUnitQuantity;
    const purchasTotal = purchaseUnitPrice * purchaseUnitQuantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId, purchaseId } = req.params;

    const result = await dbService.editPurchaseById(purchaseName, purchaseUnit, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDetails, purchaseId);

    res.redirect('/purchasing/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const result = await dbService.editPurchaseById(purchaseId, npurchaseName, npurchaseJob, npurchasePhoneNum);

    res.redirect('/purchasing/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;