const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const invoices = await dbService.getPurchasesByProjectId(projectId);

  res.render('invoices/index', { invoices: invoices, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('invoices/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const invoice_name = req.body.invoiceName;
    const invoice_unit_price = req.body.invoiceunitprice;
    const invoice_unit_qantity = req.body.invoiceunitqantity;
    const invoice_total = invoice_unit_price * invoice_unit_qantity;
    const purchaseType = req.body.purchaseType;
    const purchaseDetails = req.body.invoiceDetails;
    const { projectId } = req.params;

    await dbService.addNewinvoice(invoice_name,invoice_details,invoice_number, invoice_unit, invoice_unit_price, invoice_unit_qantity,invoice_total,  projectId);

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

router.get('/:projectId/info/:invoiceId', security.checkAuthenticated, async (req, res) => {
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

    res.render('invoices/edit', { invoice: invoice, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const invoice_name = req.body.invoiceName;
    const invoiceUnitPrice = req.body.invoiceUnitPrice;
    const invoiceUnitQuantity = req.body.invoiceUnitQuantity;
    const invoiceTotal = invoiceUnitPrice * invoiceUnitQuantity;
    const invoiceType = req.body.invoiceType;
    const invoiceDetails = req.body.purchaseDetails;
    const { projectId,invoiceId } = req.params;

    const result = await dbService.editinvoiceById(purchaseName, purchaseUnit, invoiceUnitPrice, invoiceUnitQuantity, invoiceTotal,invoiceType, invoiceetails, purchaseId);

    res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, invoiceId } = req.params;

    const result = await dbService.editinvoiceById(invoiceId, ninvoiceName, npurchaseJob, npurchasePhoneNum);

    res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;