const express = require('express');
const security = require('../security/security');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

router.get('/:projectId/', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  res.render('reports/index', { projectId: projectId });
});

router.post('/finalreports/:projectId/', security.checkAuthenticated, async (req, res) => {
  const id = req.params.projectId;

  let reportList = [], reportData = [], finalTotal = 0, ratio = req.body.ratio, project, details, totalSql, startDate, endDate, managerRatio;

  let projectSql = 'SELECT * FROM projects WHERE id = ?';

  project = await dbService.runQuery(projectSql, id);
  project = JSON.parse(JSON.stringify(project[0]));

  let optionsList = {
    employees: req.body.employeesReport, 
    outlays: req.body.outlaysReport, 
    contractors: req.body.contractorsReport, 
    equipments: req.body.equipmentsReport, 
    purchases: req.body.purchasesReport, 
    invoices: req.body.invoicesReport, 
    managers: req.body.managersReport
  };

  Object.keys(optionsList).forEach(optionList => {
    if (optionsList[optionList] == 'on') {
      reportList.push(optionList);
    }
  });

  if (reportList.includes('employees')) {
    details = 'إجمالي الإيدي العاملة';
    startDate = 'SELECT MIN(employee_start_date) startDate FROM employees WHERE project_id = ?';
    endDate = 'SELECT MAX(employee_end_date) endDate FROM employees WHERE project_id = ?';
    totalSql = 'SELECT SUM(employee_total) total FROM employees WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  if (reportList.includes('outlays')) {
    details = 'إجمالي النثريات';
    startDate = 'SELECT MIN(outlay_date) startDate FROM outlays WHERE project_id = ?';
    endDate = 'SELECT MAX(outlay_date) endDate FROM outlays WHERE project_id = ?';
    totalSql = 'SELECT SUM(outlay_total) total FROM outlays WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  if (reportList.includes('contractors')) {
    details = 'إجمالي خرج المقاولين';
    startDate = 'SELECT MIN(project_start_date) startDate FROM projects WHERE id = ?';
    endDate = 'SELECT MAX(project_end_date) endDate FROM projects WHERE id = ?';
    totalSql = 'SELECT SUM(contractor_work_total) total FROM contractors WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  if (reportList.includes('equipments')) {
    details = 'إجمالي اجور المعدات';
    startDate = 'SELECT MIN(equipment_date) startDate FROM equipments WHERE project_id = ?';
    endDate = 'SELECT MAX(equipment_date) endDate FROM equipments WHERE project_id = ?';
    totalSql = 'SELECT SUM(equipment_total) total FROM equipments WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  if (reportList.includes('purchases')) {
    details = 'إجمالي المشتريات';
    startDate = 'SELECT MIN(purchas_date) startDate FROM purchases WHERE project_id = ?';
    endDate = 'SELECT MAX(purchas_date) endDate FROM purchases WHERE project_id = ?';
    totalSql = 'SELECT SUM(purchase_total) total FROM purchases WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  if (reportList.includes('invoices')) {
    details = 'إجمالي مشتريات الفواتير';
    startDate = 'SELECT MIN(invoice_date) startDate FROM invoices WHERE project_id = ?';
    endDate = 'SELECT MAX(invoice_date) endDate FROM invoices WHERE project_id = ?';
    totalSql = 'SELECT SUM(invoice_total) total FROM invoices WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  if (reportList.includes('managers')) {
    details = 'إجمالي مصروفات المشرف';
    startDate = 'SELECT MIN(manager_outlay_date) startDate FROM managers WHERE project_id = ?';
    endDate = 'SELECT MAX(manager_outlay_date) endDate FROM managers WHERE project_id = ?';
    totalSql = 'SELECT SUM(manager_outlay_amount) total FROM managers WHERE project_id = ?';

    reportData.push(await getDataObject(details, startDate, endDate, totalSql, id));
  }

  reportData.forEach((data, i) => {
    data.id = i + 1;
    finalTotal += data.total;
  });

  if (ratio > 0) {
    managerRatio = ratio * finalTotal / 100;
  }

  let finalData = {
    project: project,
    title: 'الترحيل النهائي',
    items: reportData,
    total: finalTotal,
    ratio: managerRatio
  };

  createPDF('finalreport.html', finalData, '/reports/' + id, res);
});

router.post('/employeesreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(employee_total) sum FROM employees WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let employees = await dbService.getEmployeesByProjectId(projectId);
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);

  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  employees.forEach((employee, i) => {
    employee.id = i + 1;
    employee.employee_start_date = tools.getStandardDate(employee.employee_start_date);
    employee.employee_end_date = tools.getStandardDate(employee.employee_end_date);
  });

  let data = {
    project: project,
    title: 'إجمالي الأيدي العاملة',
    items: employees,
    total: total
  }

  createPDF('employees.html', data, '/employees/' + projectId, res);
});

router.post('/contractorsreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(contractor_work_total) sum FROM contractors WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let contractors = await dbService.getContractorsByProjectId(projectId);
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);

  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  contractors.forEach((contractor, i) => {
    contractor.id = i + 1;
  });

  let data = {
    project: project,
    title: 'كشف حساب مقاولين',
    items: contractors,
    total: total
  }

  createPDF('contractors.html', data, '/contractors/' + projectId, res);
});

router.post('/contractorsdeporeport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(deposit_price) sum FROM contractorsdeposits LEFT JOIN  contractors ON contractorsdeposits.contractor_id = contractors.id WHERE contractors.project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let contractorsdepo = await dbService.getContractorsDepoByProjectId(projectId);
  
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);
  
  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));
  
  contractorsdepo.forEach((contractordepo, i) => {
    contractordepo.id = i + 1;
    contractordepo.deposit_date = tools.getStandardDate(contractordepo.deposit_date);
  });

  let data = {
    project: project,
    title: 'صرف / قبض مقاولين',
    items: contractorsdepo,
    total: total
  }

  createPDF('contractorsDepo.html', data, '/contractorsdepo/' + projectId, res);
});

router.post('/depositsreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(deposit_price) sum FROM deposits LEFT JOIN  employees ON deposits.employee_id = employees.id WHERE employees.project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let deposits = await dbService.getDepositsByProjectId(projectId);
  
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);
  
  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));
  
  deposits.forEach((deposits, i) => {
    deposits.id = i + 1;
    deposits.deposit_date = tools.getStandardDate(deposits.deposit_date);
  });

  let data = {
    project: project,
    title: 'صرف / قبض عمال',
    items: deposits,
    total: total
  }

  createPDF('deposits.html', data, '/deposits/' + projectId, res);
});


router.post('/purchasesreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(purchase_total) sum FROM purchases WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let purchases = await dbService.getPurchasesByProjectId(projectId);
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);

  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  purchases.forEach((purchase, i) => {
    purchase.id = i + 1;
    purchase.purchase_date = tools.getStandardDate(purchase.purchase_date);
    purchase.purchase_date = tools.getStandardDate(purchase.purchase_date);
  });

  let data = {
    project: project,
    title: 'إجمالي المشتريات',
    items: purchases,
    total: total
  }

  createPDF('invoices.html', data, '/invoices/' + projectId, res);
});

router.post('/invoicesreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(invoice_total) sum FROM invoices WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let invoices = await dbService.getInvoicesByProjectId(projectId);
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);

  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  invoices.forEach((invoice, i) => {
  invoice.id = i + 1;
  invoice.invoice_date = tools.getStandardDate(invoice.invoice_date);
    invoice.invoice_date = tools.getStandardDate(invoice.invoice_date);
  });

  let data = {
    project: project,
    title: ' إجمالي المشتريات بالفواتير',
    items: invoices,
    total: total
  }

  createPDF('invoices.html', data, '/invoices/' + projectId, res);
});

router.post('/outlaysreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(outlay_total) sum FROM outlays WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let outlays = await dbService.getOutlaysByProjectId(projectId);
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);

  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  outlays.forEach((outlay, i) => {
  outlay.id = i + 1;
  outlay.outlay_date = tools.getStandardDate(outlay.outlay_date);
    outlay.outlay_date = tools.getStandardDate(outlay.outlay_date);
  });

  let data = {
    project: project,
    title: ' إجمالي النثريات',
    items: outlays,
    total: total
  }

  createPDF('outlays.html', data, '/outlays/' + projectId, res);
});

router.post('/managersreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(manager_outlay_amount) sum FROM managers WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let managers = await dbService.getManagersByProjectId(projectId);
  
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);
  
  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  managers.forEach((manager, i) => {
    manager.id = i + 1;
    manager.manager_outlay_date = tools.getStandardDate(manager.manager_outlay_date);
  });

  let data = {
    project: project,
    title: 'مصاريف المشرف',
    items: managers,
    total: total
  }

  createPDF('managers.html', data, '/managers/' + projectId, res);
});

router.post('/equipmentsreport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(equipment_total) sum FROM equipments WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let equipments = await dbService.getEquipmentsByProjectId(projectId);
  
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);
  
  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  equipments.forEach((equipment, i) => {
    equipment.id = i + 1;
    equipment.equipment_date = tools.getStandardDate(equipment.equipment_date);
  });

  let data = {
    project: project,
    title: 'اجور المعدات',
    items: equipments,
    total: total
  }

  createPDF('equipments.html', data, '/equipments/' + projectId, res);
});

router.post('/paymentsservicereport/:projectId', security.checkAuthenticated, async (req, res) => {
  const { projectId } = req.params;

  const totalSql = 'SELECT SUM(payments_amount) sum FROM paymentsservice WHERE project_id = ?';
  const totalParams = [projectId];

  const projectSql = 'SELECT * FROM projects WHERE id = ?';
  const projectParams = [projectId];

  let paymentsService = await dbService.getPaymentsServiceByProjectId(projectId);
  
  let total = await dbService.runQuery(totalSql, totalParams);
  let project = await dbService.runQuery(projectSql, projectParams);
  
  total = JSON.parse(JSON.stringify(total[0]));
  project = JSON.parse(JSON.stringify(project[0]));

  paymentsService.forEach((paymentService, i) => {
    paymentService.id = i + 1;
    paymentService.payments_date = tools.getStandardDate(paymentService.payments_date);
  });

  let data = {
    project: project,
    title: 'المسلمات',
    items: paymentsService,
    total: total
  }

  createPDF('paymentsservice.html', data, '/paymentsservice/' + projectId, res);
});

function createPDF(templateFile, data, srcPath, res) {
  const html = fs.readFileSync(path.join(__dirname, '../views/reports/' + templateFile), 'utf-8');
  const filename = 'report' + Math.random() + '_doc' + '.pdf';
  
  const reportOptions = {
    formate: 'A4',
    orientation: 'portrait',
    border: '4mm',
    header: {
      height: '',
      contents: ''
    },
    footer: {
      height: '',
      contents: {}
    }
  }

  const document = {
    html: html,
    data: data,
    path: './docs/' + filename
  };

  pdf.create(document, reportOptions)
    .then(res.redirect(srcPath))
    .catch(err => { console.log(err) });
}

async function getDataObject(details, startDate, endDate, totalSql, id) {
  startDate = await dbService.runQuery(startDate, id);
  endDate = await dbService.runQuery(endDate, id);
  total = await dbService.runQuery(totalSql, id);

  startDate = JSON.parse(JSON.stringify(startDate[0]));
  endDate = JSON.parse(JSON.stringify(endDate[0]));
  total = JSON.parse(JSON.stringify(total[0]));

  startDate = tools.getStandardDate(startDate.startDate);
  endDate = tools.getStandardDate(endDate.endDate);
  total = total.total;

  return {
    details: details,
    startDate: startDate,
    endDate: endDate,
    total: total
  }
}

module.exports = router;