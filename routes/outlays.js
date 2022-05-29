const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const outlays = await dbService.getOutlaysByProjectId(projectId);

  res.render('outlays/index', { outlays: outlays, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('outlays/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const outlayName = req.body.outlayName;
    const outlayDate = req.body.outlayDate;
    const outlayUnitPrice = req.body.outlayUnitPrice;
    const outlayUnitQuantity = req.body.outlayUnitQuantity;
    const outlayDetails = req.body.outlayDetails;
    const outlayTotal = outlayUnitPrice * outlayUnitQuantity;
    const { projectId } = req.params;

    await dbService.addNewOutlay(outlayName, outlayDate, outlayUnitPrice, outlayUnitQuantity, outlayDetails, outlayTotal, projectId);

    res.redirect('/outlays/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/outlays/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:outlayId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, outlayId } = req.params;

    const result = await dbService.deleteOutlayById(outlayId);

    if (result) res.redirect('/outlays/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:outlayId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, outlayId } = req.params;

    let outlay = await dbService.getOutlayById(outlayId);
    outlay.outlay_date = tools.getStandardDate(outlay.outlay_date);

    res.render('outlays/info', { outlay: outlay, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:outlayId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, outlayId } = req.params;

    const outlay = await dbService.getOutlayById(outlayId);

    res.render('outlays/edit', { outlay: outlay, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:outlayId', security.checkAuthenticated, async (req, res) => {
  try {
    const outlayName = req.body.outlayName;
    const outlayDate = req.body.outlayDate;
    const outlayUnitPrice = req.body.outlayUnitPrice;
    const outlayUnitQuantity = req.body.outlayUnitQuantity;
    const outlayDetails = req.body.outlayDetails;
    const outlayTotal = outlayUnitPrice * outlayUnitQuantity;
    const { projectId, outlayId } = req.params;

    const result = await dbService.editOutlayById(outlayName, outlayDate, outlayUnitPrice, outlayUnitQuantity, outlayDetails, outlayTotal, outlayId);

    res.redirect('/outlays/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:outlayId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId,  outlayId } = req.params;

    const result = await dbService.editPurchaseById( outlayId, npurchaseName, npurchaseJob, npurchasePhoneNum);

    res.redirect('/outlays/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;