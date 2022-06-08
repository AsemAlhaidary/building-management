const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const paymentsService = await dbService.getPaymentsServiceByProjectId(projectId);

  paymentsService.forEach(paymentService => {
    paymentService.payments_date = tools.getStandardDate(paymentService.payments_date);
  });

  res.render('paymentsservice/index', {paymentsService: paymentsService, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('paymentsservice/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const paymentAmount = req.body.paymentAmount;
    const paymentDate = req.body.paymentDate;
    const paymentDetails = req.body.paymentDetails;
    
    const { projectId } = req.params;

    await dbService.addNewPaymentService(paymentAmount, paymentDate, paymentDetails, projectId);

    res.redirect('/paymentsservice/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/paymentsservice/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:paymentserviceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, paymentserviceId } = req.params;

    const result = await dbService.deletePaymentServiceById(paymentserviceId);

    if (result) res.redirect('/paymentsservice/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:paymentserviceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, paymentserviceId } = req.params;

    let paymentService = await dbService.getPaymentServiceById(paymentserviceId);
    paymentService.payments_date = tools.getStandardDate(paymentService.payments_date);

    res.render('paymentsservice/info', { paymentService: paymentService, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:paymentserviceId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, paymentserviceId } = req.params;

    const paymentService = await dbService.getPaymentServiceById(paymentserviceId);

    res.render('paymentsservice/edit', {paymentService: paymentService, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:paymentserviceId', security.checkAuthenticated, async (req, res) => {
  try {
    const paymentAmount = req.body.paymentAmount;
    const paymentDate = req.body.paymentDate;
    const paymentDetails = req.body.paymentDetails;
    
    const { projectId, paymentserviceId } = req.params;

    await dbService.editPaymentService(paymentAmount, paymentDate, paymentDetails, paymentserviceId);

    res.redirect('/paymentsservice/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/paymentsservice/' + projectId + '/edit');
  }
});


router.post('/:projectId/report/:equipmentId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId,  equipmentId } = req.params;

    const result = await dbService.editEquipmentById( equipmentId, nequipmentame, npurchaseJob, nequipment);

    res.redirect('/paymentsservice/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;