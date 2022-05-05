const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const extras = await dbService.getExtrasByProjectId(projectId);

  res.render('extras/index', { extras: extras, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const employees = await dbService.getEmployeesByProjectId(projectId);

  res.render('extras/new', { employees: employees, projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const extraTime = req.body.extraTime;
    const extraTimePrice = req.body.extraTimePrice;
    const extraTotalPrice = extraTime * extraTimePrice;
    const { projectId } = req.params;

    await dbService.addNewExtraTime(extraTime, extraTimePrice, extraTotalPrice, employeeId);

    res.redirect('/extras/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/extras/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:extraId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,extraId } = req.params;

    const result = await dbService.deleteExtraById(extraId);

    if (result) res.redirect('/extras/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:extraId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, extraId } = req.params;

    const extra = await dbService.getExtraById(extraId);

    res.render('extras/info', { extra: extra, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:extraId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,extraId } = req.params;

    const extra = await dbService.getExtraById(extraId);
    const employees = await dbService.getEmployeesByProjectId(projectId);

    res.render('extras/edit', { employees: employees, extra: extra, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:extraId', security.checkAuthenticated, async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const nExtraTime = req.body.nExtraTime;
    const nExtraTimePrice = req.body.nExtraTimePrice;
    const nExtraTotalPrice = nExtraTime * nExtraTimePrice;
    const { projectId, extraId } = req.params;

    await dbService.editExtraTimeById(nExtraTime, nExtraTimePrice, nExtraTotalPrice, employeeId, extraId);

    res.redirect('/extras/' + projectId);
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