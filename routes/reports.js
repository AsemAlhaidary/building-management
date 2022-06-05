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

module.exports = router;