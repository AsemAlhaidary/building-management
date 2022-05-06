const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const router = express.Router();

const dbService = database.getDbServiceInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const contractors = await dbService.getContractorsByProjectId(projectId);

  res.render('contractors/index', { contractors: contractors, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, (req, res) => {
  const { projectId } = req.params;
  const workTypes = ['مقطوعية', 'متر مربع', 'متر مسطح'];

  res.render('contractors/new', { projectId: projectId, workTypes: workTypes, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId } = req.params;
    const contractorName = req.body.contractorName;
    const contractorDetails = req.body.contractorDetails;
    const contractorWorkUnit = req.body.contractorWorkUnit;

    if (contractorWorkUnit != 'مقطوعية') {
      const contractorWorkQuantity = req.body.contractorWorkQuantity;
      const contractorUnitPrice = req.body.contractorUnitPrice;
      const contractorWorkTotal = contractorWorkQuantity * contractorUnitPrice;
      await dbService.addNewContractor(contractorName, contractorDetails, contractorWorkUnit, contractorWorkQuantity, contractorUnitPrice, contractorWorkTotal, projectId);
    } else {
      const contractorWorkQuantity = null;
      const contractorUnitPrice = null;
      const contractorWorkTotal = req.body.contractorWorkTotal;
      await dbService.addNewContractor(contractorName, contractorDetails, contractorWorkUnit, contractorWorkQuantity, contractorUnitPrice, contractorWorkTotal, projectId);
    }

    res.redirect('/contractors/' + projectId);
  } catch (error) {
    console.log(error.message);
    res.redirect('/contractors/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:contractorId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,contractorId } = req.params;

    const result = await dbService.deleteContractorById(contractorId);

    if (result) res.redirect('/contractors/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:contractorId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, contractorId } = req.params;

    const contractor = await dbService.getContractorById(contractorId);

    res.render('contractors/info', { contractor: contractor, projectId: projectId } );
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/edit/:contractorId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,contractorId } = req.params;
    const workTypes = ['مقطوعية', 'متر مربع', 'متر مسطح'];

    const contractor = await dbService.getContractorById(contractorId);

    res.render('contractors/edit', { contractor: contractor, workTypes: workTypes, projectId: projectId, label: false});
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:contractorId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, contractorId } = req.params;
    const nContractorName = req.body.nContractorName;
    const nContractorDetails = req.body.nContractorDetails;
    const nContractorWorkUnit = req.body.nContractorWorkUnit;

    if (nContractorWorkUnit != 'مقطوعية') {
      const nContractorWorkQuantity = req.body.nContractorWorkQuantity;
      const nContractorUnitPrice = req.body.nContractorUnitPrice;
      const nContractorWorkTotal = nContractorWorkQuantity * nContractorUnitPrice;
      await dbService.editContractorById(nContractorName, nContractorDetails, nContractorWorkUnit, nContractorWorkQuantity, nContractorUnitPrice, nContractorWorkTotal, contractorId);
    } else {
      const nContractorWorkQuantity = null;
      const nContractorUnitPrice = null;
      const nContractorWorkTotal = req.body.nContractorWorkTotal;
      await dbService.editContractorById(nContractorName, nContractorDetails, nContractorWorkUnit, nContractorWorkQuantity, nContractorUnitPrice, nContractorWorkTotal, contractorId);
    }

    res.redirect('/contractors/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:employeeId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;

    const result = await dbService.editEmployeeById(employeeId, nEmployeeName, nEmployeeJob, nEmployeePhoneNum);

    res.redirect('/employees/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;