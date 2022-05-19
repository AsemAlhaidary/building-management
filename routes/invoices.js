const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const invoices = await dbService.getInvoicesByProjectId(projectId);

  res.render('invoices/index', { invoices: invoices, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('invoices/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const invoiceName = req.body.invoiceName;
    const invoiceNumber = req.body.invoiceNumber;
    const invoiceUnit = req.body.invoiceUnit;
    const invoiceUnitPrice= req.body.invoiceUnitPrice;
    const invoiceQuantity= req.body.invoiceQuantity;
    const invoiceType= req.body.invoiceType;
    const invoiceDetails = req.body.invoiceDetails;
    const invoiceTotal = invoiceUnitPrice * invoiceQuantity;
    const { projectId } = req.params;

    await dbService.addNewinvoice(invoiceName, invoiceNumber, invoiceUnit, invoiceUnitPrice, invoiceQuantity, invoiceType, invoiceDetails, invoiceTotal, projectId);

    res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/invoices/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, invoiceId } = req.params;

    const result = await dbService.deleteInvoiceById(invoiceId);

    if (result) res.redirect('/invoices/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, invoiceId } = req.params;

    const invoice = await dbService.getInvoiceById(invoiceId);

    res.render('invoices/info', { invoice: invoice, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,invoiceId } = req.params;

    const invoice = await dbService.getInvoiceById(invoiceId);

    res.render('invoices/edit', { invoice: invoice, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:invoiceId', security.checkAuthenticated, async (req, res) => {
  try {
    const invoiceName = req.body.invoiceName;
    const invoiceNumber = req.body.invoiceNumber;
    const invoiceUnit = req.body.invoiceUnit;
    const invoiceUnitPrice= req.body.invoiceUnitPrice;
    const invoiceQuantity= req.body.invoiceQuantity;
    const invoiceType= req.body.invoiceType;
    const invoiceDetails = req.body.invoiceDetails;
    const invoiceTotal = invoiceUnitPrice * invoiceQuantity;
    const { projectId, invoiceId } = req.params;

    await dbService.editInvoiceById(invoiceName, invoiceNumber, invoiceUnit, invoiceUnitPrice, invoiceQuantity, invoiceType, invoiceDetails, invoiceTotal, invoiceId);

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