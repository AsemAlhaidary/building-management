const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const purchases = await dbService.getPurchasesByProjectId(projectId);

  res.render('invoices/index', { purchases: invoices, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('invoices/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const invoice_name = req.body.purchaseName;
    const invoice_unit_price = req.body.invoiceunitprice;
    const invoice_unit_qantity = req.body.invoiceunitqantity;
    const invoice_total = invoice_unit_price * invoice_unit_qantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId } = req.params;

    await dbService.addNewPurchase(invoice_name,invoice_details,invoice_number, invoice_unit, invoice_unit_price, invoice_unit_qantity,invoice_total,  projectId);

    res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/invoices/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,invoiceId } = req.params;

    const result = await dbService.deleteinvoiceById(invoiceId);

    if (result) res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:purchaseId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, invoiceId } = req.params;

    const purchase = await dbService.getPurchaseById(invoicesId);

    res.render('invoices/info', { invoice: invoice, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/info/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, invoiceId } = req.params;

    const invoice = await dbService.getPurchaseById(invoiceId);

    res.redirect('/invoices/' + projectId );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,invoiceId } = req.params;

    const purchase = await dbService.getinvoiceById(invoiceId);

    res.render('purchases/edit', { invoice: invoice, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const invoice_name = req.body.purchaseName;
    const purchaseUnitPrice = req.body.purchaseUnitPrice;
    const purchaseUnitQuantity = req.body.purchaseUnitQuantity;
    const purchasTotal = purchaseUnitPrice * purchaseUnitQuantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.purchaseDetails;
    const { projectId, purchaseId } = req.params;

    const result = await dbService.editPurchaseById(purchaseName, purchaseUnit, purchaseUnitPrice, purchaseUnitQuantity, purchasTotal, purchaseType, purchaseDetails, purchaseId);

    res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, invoiceId } = req.params;

    const result = await dbService.editPurchaseById(purchaseId, npurchaseName, npurchaseJob, npurchasePhoneNum);

    res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;