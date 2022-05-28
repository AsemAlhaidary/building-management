const express = require('express');
const security = require('../security/security');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  let contractorsDeposits = await dbService.getContractorsDepoByProjectId(projectId);

  contractorsDeposits.forEach(contractorDeposit => {
    contractorDeposit.deposit_date = tools.getStandardDate(contractorDeposit.deposit_date);
  });

  res.render('contractorsdepo/index', { contractorsDeposits: contractorsDeposits, projectId: projectId });
});

router.get('/:projectId/new', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const contractors = await dbService.getContractorsByProjectId(projectId);

  const methods = ['صرف', 'قبض'];

  res.render('contractorsdepo/new', { contractors: contractors, methods: methods, projectId: projectId, label: false });
});

router.post('/:projectId/create', security.checkAuthenticated, async (req, res) => {
  try {
    const contractorId = req.body.contractorId;
    const depositMethod = req.body.depositMethod;
    const depositDate = req.body.depositDate;
    let depositPrice = req.body.depositPrice;
    const { projectId } = req.params;

    const contractorBalance = (await dbService.getContractorById(contractorId)).contractor_work_total;
    const depositsSum = (await dbService.calcContractorsDepoByContractorId(contractorId)).sum;
    const totalContractorBalance = contractorBalance + depositsSum;

    if (depositMethod == 'صرف') {
      depositPrice *= -1;

      if (totalContractorBalance - (depositPrice * -1) >= 0) {
        await dbService.addNewContractorDepo(depositMethod, depositDate, depositPrice, contractorId);
        res.redirect('/contractorsdepo/' + projectId);
      } else {
        req.flash('error', 'لقد تجاوزت المبلغ المتاح لك')
        res.redirect('/contractorsdepo/' + projectId + '/new');
      }

    } else {
      await dbService.addNewContractorDepo(depositMethod, depositDate, depositPrice, contractorId);
      res.redirect('/contractorsdepo/' + projectId);
    }

  } catch (error) {
    console.log(error);
    res.redirect('/contractorsdepo/' + projectId + '/new');
  }
});

router.post('/:projectId/delete/:contractorDeposit', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, contractorDeposit } = req.params;

    const result = await dbService.deleteContractorDepoById(contractorDeposit);

    if (result) res.redirect('/contractorsdepo/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:projectId/info/:contractorDepositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId, contractorDepositId } = req.params;

    const contractorDeposit = await dbService.getContractorDepoById(contractorDepositId);
    contractorDeposit.deposit_date = tools.getStandardDate(contractorDeposit.deposit_date);
    
    res.render('contractorsdepo/info', { contractorDeposit: contractorDeposit, projectId: projectId } );
  } catch (error) {
    console.log(error);
  }
});

router.get('/:projectId/edit/:contractorDepositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId ,contractorDepositId } = req.params;

    const contractors = await dbService.getContractorsByProjectId(projectId);
    let contractorDeposit = await dbService.getContractorDepoById(contractorDepositId);

    if (contractorDeposit.deposit_price < 0) {
      contractorDeposit.deposit_price = contractorDeposit.deposit_price * -1;
    }

    const methods = ['صرف', 'قبض'];

    res.render('contractorsdepo/edit', { contractors: contractors, methods: methods, contractorDeposit: contractorDeposit, projectId: projectId, label: false });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/edit/:contractorDepositId', security.checkAuthenticated, async (req, res) => {
  try {
    const contractorId = req.body.contractorId;
    const depositMethod = req.body.depositMethod;
    const depositDate = req.body.depositDate;
    let depositPrice = req.body.depositPrice;
    const { projectId, contractorDepositId } = req.params;

    const contractorBalance = (await dbService.getContractorById(contractorId)).contractor_work_total;
    const depositsSum = (await dbService.calcContractorsDepoByContractorId(contractorId)).sum;
    const totalContractorBalance = contractorBalance + depositsSum;

    if (depositMethod == 'صرف') {
      depositPrice *= -1;

      if (totalContractorBalance - (depositPrice * -1) >= 0) {
        await dbService.editContractorDepoById(depositMethod, depositDate, depositPrice, contractorId, contractorDepositId);
        res.redirect('/contractorsdepo/' + projectId);
      } else {
        req.flash('error', 'لقد تجاوزت المبلغ المتاح لك')
        res.redirect('/contractorsdepo/' + projectId + '/new');
      }

    } else {
      await dbService.editContractorDepoById(depositMethod, depositDate, depositPrice, contractorId, contractorDepositId);
      res.redirect('/contractorsdepo/' + projectId);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/:projectId/report/:contractorDepositId', security.checkAuthenticated, async (req, res) => {
  try {
    const { projectId,contractorDepositId } = req.params;

    const result = await dbService.editdepositById(contractorDepositId, ndepositName, ndepositeJob, ndepositPhoneNum);

    res.redirect('/deposits/' + projectId);
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = router;