const express = require('express');
const security = require('../security/security');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const database = require('../models/database');
const logo = require('../models/base64');
const router = express.Router();

const dbService = database.getDbServiceInstance();

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

  const sql = 'SELECT SUM(employee_total) tot FROM employees WHERE project_id = ?';
  const params = [projectId];

  const employees = await dbService.getEmployeesByProjectId(projectId);
  const total = await dbService.runQuery(sql, params);
  
  const finalTotal = JSON.parse(JSON.stringify(total[0]));
  
  let nEmployees = [];
  
  employees.forEach(e => {
    let employee = {
      name: e.employee_name,
      job: e.employee_job,
      dayPrice: e.employee_day_price,
      startDate: getStandardDate(e.employee_start_date),
      endDate: getStandardDate(e.employee_end_date),
      total: e.employee_total
    };
    nEmployees.push(employee);
  })

  const document = {
    html: html,
    data: {
      items: nEmployees,
      total: finalTotal,
      logoImg: logo
    },
    path: './docs/' + filename
  };

  pdf.create(document, reportOptions)
    .then(res.redirect('/employees/' + projectId))
    .catch(err => { console.log(err) });
});

function getStandardDate(date) {
  let today = new Date(date);
  return (today.getDate()) + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear());
}

module.exports = router;