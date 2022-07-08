const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();
router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const purchases = await dbService.getPurchasesByProjectId(projectId);

  res.render('purchases/index', { purchases: purchases, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('purchases/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const purchaseName = req.body.purchaseName;
    const purchaseDate = req.body.purchaseDate;
    const purchaseUnitPrice = req.body.purchaseUnitPrice;
    const purchaseUnitQuantity = req.body.purchaseUnitQuantity;
    const purchasTotal = purchaseUnitPrice * purchaseUnitQuantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId } = req.params;

    await dbService.addNewPurchase(purchaseName, purchaseDate, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDetails,  projectId);

    res.redirect('/purchases/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/purchases/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,purchaseId } = req.params;

    const result = await dbService.deletePurchaseById(purchaseId);

    if (result) res.redirect('/purchases/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params;

    const purchase = await dbService.getPurchaseById(purchaseId);
    purchase.purchase_date = tools.getStandardDate(purchase.purchase_date);
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
    const purchaseDetails = req.body.purchaseDetails;
    const purchaseType = req.body.purchaseType;
    const purchaseDate = req.body.purchaseDate;
    const { projectId, purchaseId } = req.params;

    const result = await dbService.editPurchaseById(purchaseName, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDate,purchaseDetails, purchaseId);

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