const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const equipments = await dbService.getEquipmentsByProjectId(projectId);

  res.render('equipments/index', {equipments: equipments, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('equipments/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const equipmentName = req.body.equipmentName;
    const equipmentDate = req.body.equipmentDate;
    const equipmentUnitPrice = req.body.equipmentUnitPrice;
    const equipmentUnitQuantity = parseFloat(req.body.equipmentUnitQuantity);
    const equipmentDetails = req.body.equipmentDetails;
    const equipmentTotal = equipmentUnitPrice * equipmentUnitQuantity;
    const { projectId } = req.params;

    await dbService.addNewEquipment(equipmentName, equipmentDate, equipmentUnitPrice, equipmentUnitQuantity, equipmentDetails, equipmentTotal, projectId);

    res.redirect('/equipments/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/equipments/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:equipmentId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, equipmentId } = req.params;

    const result = await dbService.deleteEquipmentById(equipmentId);

    if (result) res.redirect('/equipments/' + projectId);
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
    const equipmentUnitQuantity = parseFloat(req.body.equipmentUnitQuantity);
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