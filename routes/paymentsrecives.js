const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const paymentsrecives = await dbService.getPaymentsrecivesByProjectId(projectId);

  res.render('paymentsrecives/index', {paymentsrecives: paymentsrecives, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('paymentsrecives/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const paymentsAmount = req.body.paymentsAmount;
    const paymentsDate = req.body.paymentsDate;
    const paymentsDetails = req.body.paymentsDetails;
    
    const { projectId } = req.params;

    await dbService.addNewpaymentsrecive(paymentsAmount, paymentsDate, paymentsDetails, projectId);

    res.redirect('/paymentsrecives/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/paymentsrecives/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:paymentsreciveId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, paymentsreciveId } = req.params;

    const result = await dbService.deletePaymentsrecivesById(paymentsreciveId);

    if (result) res.redirect('/paymentsrecives/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:equipmentId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, equipmentId } = req.params;

    let equipment = await dbService.getEquipmentById(equipmentId);
    equipment.equipment_date = tools.getStandardDate(equipment.equipment_date);

    res.render('equipments/info', { equipment: equipment, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:equipmentId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, equipmentId } = req.params;

    const equipment = await dbService.getEquipmentById(equipmentId);

    res.render('equipments/edit', {equipment: equipment, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:equipmentId', security.checkAuthenticated, async (req, res) => {
  try {
    const equipmentName = req.body.equipmentName;
    const equipmentDate = req.body.equipmentDate;
    const equipmentUnitPrice = req.body.equipmentUnitPrice;
    const equipmentUnitQuantity = req.body.equipmentUnitQuantity;
    const equipmentDetails = req.body.equipmentDetails;
    const equipmentTotal = equipmentUnitPrice * equipmentUnitQuantity;
    const { projectId, equipmentId } = req.params;

    const result = await dbService.editEquipmentById(equipmentName, equipmentDate, equipmentUnitPrice, equipmentUnitQuantity, equipmentDetails,equipmentTotal, equipmentId);

    res.redirect('/equipments/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:equipmentId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId,  equipmentId } = req.params;

    const result = await dbService.editEquipmentById( equipmentId, nequipmentame, npurchaseJob, nequipment);

    res.redirect('/equipments/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;