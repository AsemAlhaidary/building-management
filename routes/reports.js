const express = require('express');
const security = require('../security/security');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const database = require('../models/database');
const usefulTools = require('../public/js/tools');
const logo = require('../public/js/base64');
const router = express.Router();

const dbService = database.getDbServiceInstance();
const tools = usefulTools.getToolsInstance();

const html = fs.readFileSync(path.join(__dirname, '../views/reports/template.html'), 'utf-8');
const filename = 'report' + Math.random() + '_doc' + '.pdf';

const reportOptions = {
  formate: 'A4',
  orientation: 'portrait',
  border: '8mm',
  header: {
    height: '15mm',
    contents: '<h4 style="color: red; font-size: 20px; font-weight: 800; text-align: center;">بسم الله الرحمن الرحيم</h4>'
  },
  footer: {
    height: '20mm',
    contents: {}
  }
}

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

  employees.forEach(employee => {
    employee.employee_start_date = tools.getStandardDate(employee.employee_start_date);
    employee.employee_end_date = tools.getStandardDate(employee.employee_end_date);
  });

  const document = {
    html: html,
    data: {
      project: project,
      items: employees,
      total: total,
      logoImg: logo
    },
    path: './docs/' + filename
  };

  pdf.create(document, reportOptions)
    .then(res.redirect('/employees/' + projectId))
    .catch(err => { console.log(err) });
});

module.exports = router;