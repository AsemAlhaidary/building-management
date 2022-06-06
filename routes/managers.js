const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const managers = await dbService.getManagersByProjectId(projectId);

  res.render('managers/index', { managers: managers, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;

  res.render('managers/new', { projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId } = req.params;
    const managerName = req.body.managerName;
    const managerOutlayDetails = req.body.managerOutlayDetails;
    const managerOutlayAmount = req.body.managerOutlayAmount;
    const managerOutlayDate = req.body.managerOutlayDate;

    await dbService.addNewManager(managerName, managerOutlayDetails, managerOutlayAmount, managerOutlayDate, projectId);

    res.redirect('/managers/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/managers/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:managerId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,managerId } = req.params;

    const result = await dbService.deleteManagerById(managerId);

    if (result) res.redirect('/managers/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:managerId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, managerId } = req.params;

    let manager = await dbService.getManagerById(managerId);
    manager.manager_outlay_date = tools.getStandardDate(manager.manager_outlay_date);

    res.render('managers/info', { manager: manager, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:managerId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,managerId } = req.params;

    const manager = await dbService.getManagerById(managerId);

    res.render('managers/edit', { manager: manager, projectId: projectId, label: false});
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:managerId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, managerId } = req.params;
    const nManagerName = req.body.nManagerName;
    const nManagerOutlayDetails = req.body.nManagerOutlayDetails;
    const nManagerOutlayAmount = req.body.nManagerOutlayAmount;
    const nManagerOutlayDate = req.body.nManagerOutlayDate;

    await dbService.editManagerById(nManagerName, nManagerOutlayDetails, nManagerOutlayAmount, nManagerOutlayDate, managerId);

    res.redirect('/managers/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

// router.post('/:projectId/report/:employeeId', security.checkAuthenticated, async (req, res) => {
//   try {
//     const { projectId, employeeId } = req.params;

//     const result = await dbService.editEmployeeById(employeeId, nEmployeeName, nEmployeeJob, nEmployeePhoneNum);

//     res.redirect('/employees/' + projectId);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

module.exports = router;