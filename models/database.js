if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mysql = require('mysql');
let instance = null;

const con = mysql.createConnection({
  host: process.env.HOSTHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
});

con.connect(err => {
  if (err) throw (new Error('Filed to connect the database')).message;
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async runQuery(sql, params) {
    try {
      const result = await new Promise((resolve, reject) => {
        con.query(sql, params, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkUsername(username) {
    const users = await this.getAllUsers();

    if (users.find(user => user.username === username)) {
      return true;
    } else {
      return false;
    }
  }

  async addNewUser(name, username, password) {
    const sql = "INSERT INTO users (name, username, password) VALUES (?, ?, ?)";
    const params = [name, username, password];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUsers() {
    const sql = "SELECT * FROM users";
    const params = [];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByUserName(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const params = [username];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewProject(projectName, projectAddress, projectStartDate, projectEndDate, userId) {
    const sql = "INSERT INTO projects (project_name, project_address, project_start_date, project_end_date, user_id) VALUES (?, ?, ?, ?, ?)";
    const params = [projectName, projectAddress, projectStartDate, projectEndDate, userId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProjectsByUserId(id) {
    const sql = "SELECT p.* FROM projects p LEFT JOIN users u ON p.user_id = u.id WHERE u.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async editProjectById(id, nProjectName, nProjectAddress, nProjectStartDate, nProjectEndDate) {
    const sql = "UPDATE projects SET project_name = ?, project_address = ?, project_start_date = ?, project_end_date = ? WHERE id = ?";
    const params = [nProjectName, nProjectAddress,  nProjectStartDate, nProjectEndDate, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProjectById(id) {
    const sql = "DELETE FROM projects WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewEmployee(employeeName, employeeJob, employeePhoneNum, employeeDayPrice, employeeWorkStart, employeeWorkEnd, employeeTotal, projectId) {
    const sql = "INSERT INTO employees (employee_name, employee_job, employee_phone_num, employee_day_price, employee_start_date, employee_end_date, employee_total, project_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [employeeName, employeeJob, employeePhoneNum, employeeDayPrice, employeeWorkStart, employeeWorkEnd, employeeTotal, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEmployeesByProjectId(id) {
    const sql = "SELECT e.* FROM employees e LEFT JOIN projects p ON e.project_id = p.id WHERE p.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEmployeeById(id) {
    const sql = "DELETE FROM employees WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editEmployeeById(employeeId, nEmployeeName, nEmployeeJob, nEmployeePhoneNum, nEmployeeDayPrice, nEmployeeWorkStart, nEmployeeWorkEnd, nEmployeeTotal) {
    const sql = "UPDATE employees SET employee_name = ?, employee_job = ?, employee_phone_num = ?, employee_day_price = ?, employee_start_date = ?, employee_end_date = ?, employee_total = ? WHERE id = ?";
    const params = [nEmployeeName, nEmployeeJob, nEmployeePhoneNum, nEmployeeDayPrice, nEmployeeWorkStart, nEmployeeWorkEnd, nEmployeeTotal, employeeId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEmployeeById(id) {
    const sql = "SELECT * FROM employees WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPurchasesByProjectId(id) {
    const sql = "SELECT r.* FROM purchases r LEFT JOIN projects p ON r.project_id = p.id WHERE p.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewPurchase(name, unitPrice, quantity, total, type, details, id) {
    const sql = "INSERT INTO purchases (purchase_name, purchase_details, purchase_type, purchase_unit_price, purchase_unit_quantity, purchase_total, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params = [name, details, type, unitPrice, quantity, total, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePurchaseById(id) {
    const sql = "DELETE FROM purchases WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPurchaseById(id) {
    const sql = "SELECT * FROM purchases WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async editPurchaseById(name, unitPrice, quantity, total, type, details, id) {
    const sql = "UPDATE purchases SET purchase_name = ?, purchase_details = ?, purchase_type = ?, purchase_unit_price = ?, purchase_unit_quantity = ?, purchase_total = ? WHERE id = ?";
    const params = [name, details, type, unitPrice, quantity, total, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getExtrasByProjectId(id) {
    const sql = "SELECT e.*, m.employee_name FROM extras e LEFT JOIN employees m ON e.employee_id = m.id WHERE m.project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewExtraTime(extraTime, extraTimePrice, extraTotalPrice, employeeId) {
    const sql = "INSERT INTO extras (extra_time, extra_time_price, extra_total_price, employee_id) VALUES (?, ?, ?, ?)";
    const params = [extraTime, extraTimePrice, extraTotalPrice, employeeId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteExtraById(id) {
    const sql = "DELETE FROM extras WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getExtraById(id) {
    const sql = "SELECT e.*, m.employee_name FROM extras e LEFT JOIN employees m ON e.employee_id = m.id WHERE e.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async editExtraTimeById(nExtraTime, nExtraTimePrice, nExtraTotalPrice, employeeId, extraId) {
    const sql = "UPDATE extras SET extra_time = ?, extra_time_price = ?, extra_total_price = ?, employee_id = ? WHERE id = ?";
    const params = [nExtraTime, nExtraTimePrice, nExtraTotalPrice, employeeId, extraId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getContractorsByProjectId(id) {
    const sql = "SELECT * FROM contractors WHERE project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewContractor(contractorName, contractorDetails, contractorWorkUnit, contractorWorkQuantity, contractorUnitPrice, contractorWorkTotal, projectId) {
    const sql = "INSERT INTO contractors (contractor_name, contractor_work_details, contractor_work_unit, contractor_work_quantity, contractor_unit_price, contractor_work_total, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params = [contractorName, contractorDetails, contractorWorkUnit, contractorWorkQuantity, contractorUnitPrice, contractorWorkTotal, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteContractorById(id) {
    const sql = "DELETE FROM contractors WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getContractorById(id) {
    const sql = "SELECT * FROM contractors WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async editContractorById(nContractorName, nContractorDetails, nContractorWorkUnit, nContractorWorkQuantity, nContractorUnitPrice, nContractorWorkTotal, contractorId) {
    const sql = "UPDATE contractors SET contractor_name = ?, contractor_work_details = ?, contractor_work_unit = ?, contractor_work_quantity = ?, contractor_unit_price = ?, contractor_work_total = ? WHERE id = ?";
    const params = [nContractorName, nContractorDetails, nContractorWorkUnit, nContractorWorkQuantity, nContractorUnitPrice, nContractorWorkTotal, contractorId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getManagersByProjectId(id) {
    const sql = "SELECT * FROM managers WHERE project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewManager(managerName, managerOutlayDetails, managerOutlayAmount, managerOutlayDate, projectId) {
    const sql = "INSERT INTO managers (manager_name, manager_outlay_details, manager_outlay_amount, manager_outlay_date, project_id) VALUES (?, ?, ?, ?, ?)";
    const params = [managerName, managerOutlayDetails, managerOutlayAmount, managerOutlayDate, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getManagerById(id) {
    const sql = "SELECT * FROM managers WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteManagerById(id) {
    const sql = "DELETE FROM managers WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editManagerById(nManagerName, nManagerOutlayDetails, nManagerOutlayAmount, nManagerOutlayDate, managerId) {
    const sql = "UPDATE managers SET manager_name = ?, manager_outlay_details = ?, manager_outlay_amount = ?, manager_outlay_date = ? WHERE id = ?";
    const params = [nManagerName, nManagerOutlayDetails, nManagerOutlayAmount, nManagerOutlayDate, managerId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getInvoicesByProjectId(id) {
    const sql = "SELECT * FROM invoices WHERE project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewinvoice(invoiceName, invoiceDate, invoiceNumber,invoiceUnitPrice, invoiceQuantity, invoiceType, invoiceDetails, invoiceTotal, projectId) {
    const sql = "INSERT INTO invoices (invoice_name, invoice_date, invoice_details, invoice_number,  invoice_unit_price, invoice_unit_quantity, invoice_type, invoice_total, project_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [invoiceName, invoiceDate, invoiceDetails, invoiceNumber, invoiceUnitPrice, invoiceQuantity, invoiceType, invoiceTotal, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getInvoiceById(id) {
    const sql = "SELECT * FROM invoices WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async editInvoiceById(invoiceName, invoiceDate, invoiceNumber,  invoiceUnitPrice, invoiceQuantity, invoiceType, invoiceDetails, invoiceTotal, id) {
    const sql = "UPDATE invoices SET invoice_name = ?, invoice_date = ?, invoice_details = ?, invoice_number = ?, invoice_unit_price = ?, invoice_unit_quantity = ?, invoice_type = ?, invoice_total = ? WHERE id = ?";
    const params = [invoiceName, invoiceDate, invoiceDetails, invoiceNumber, invoiceUnitPrice, invoiceQuantity, invoiceType, invoiceTotal, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteInvoiceById(id) {
    const sql = "DELETE FROM invoices WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDepositsByProjectId(id) {
    const sql = "SELECT d.*, e.employee_name FROM deposits d LEFT JOIN employees e ON d.employee_id = e.id WHERE e.project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDepositBytId(id) {
    const sql = "SELECT d.*, e.employee_name FROM deposits d LEFT JOIN employees e ON d.employee_id = e.id WHERE d.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewDeposit(depositMethod, depositDate, depositPrice, employeeId) {
    const sql = "INSERT INTO deposits (deposit_method, deposit_date, deposit_price, employee_id) VALUES (?, ?, ?, ?)";
    const params = [depositMethod, depositDate, depositPrice, employeeId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteDepositById(id) {
    const sql = "DELETE FROM deposits WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async calculateDepositsByEmployeeId(id) {
    const sql = "SELECT sum(deposit_price) sum FROM deposits WHERE employee_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getContractorsDepoByProjectId(id) {
    const sql = "SELECT c.*, o.contractor_name FROM contractorsdeposits c LEFT JOIN contractors o ON c.contractor_id = o.id WHERE o.project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getContractorDepoById(id) {
    const sql = "SELECT c.*, o.contractor_name FROM contractorsdeposits c LEFT JOIN contractors o ON c.contractor_id = o.id WHERE c.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewContractorDepo(depositMethod, depositDate, depositPrice, contractorId) {
    const sql = "INSERT INTO contractorsdeposits (deposit_method, deposit_date, deposit_price, contractor_id) VALUES (?, ?, ?, ?)";
    const params = [depositMethod, depositDate, depositPrice, contractorId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteContractorDepoById(id) {
    const sql = "DELETE FROM contractorsdeposits WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editContractorDepoById(depositMethod, depositDate, depositPrice, contractorId, id) {
    const sql = "UPDATE contractorsdeposits SET deposit_method = ?, deposit_date = ?, deposit_price = ?, contractor_id = ? WHERE id = ?";
    const params = [depositMethod, depositDate, depositPrice, contractorId, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async calcContractorsDepoByContractorId(id) {
    const sql = "SELECT sum(deposit_price) sum FROM contractorsdeposits WHERE contractor_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOutlaysByProjectId(id) {
    const sql = "SELECT * FROM outlays WHERE project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewOutlay(outlayName, outlayDate, outlayUnitPrice, outlayUnitQuantity, outlayDetails, outlayTotal, projectId) {
    const sql = "INSERT INTO outlays (outlay_name, outlay_details, outlay_date, outlay_unit_price, outlay_unit_quantity, outlay_total, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params = [outlayName, outlayDetails, outlayDate, outlayUnitPrice, outlayUnitQuantity, outlayTotal, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOutlayById(id) {
    const sql = "DELETE FROM outlays WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOutlayById(id) {
    const sql = "SELECT * FROM outlays WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async editOutlayById(outlayName, outlayDate, outlayUnitPrice, outlayUnitQuantity, outlayDetails, outlayTotal, id) {
    const sql = "UPDATE outlays SET outlay_name = ?, outlay_details = ?, outlay_date = ?, outlay_unit_price = ?, outlay_unit_quantity = ?, outlay_total = ? WHERE id = ?";
    const params = [outlayName, outlayDetails, outlayDate, outlayUnitPrice, outlayUnitQuantity, outlayTotal, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getEquipmentsByProjectId(id) {
    const sql = "SELECT * FROM equipments WHERE project_id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getEquipmentById(id) {
    const sql = "SELECT * FROM equipments WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewEquipment(equipmentName, equipmentDate, equipmentUnitPrice, equipmentUnitQuantity, equipmentDetails, equipmentTotal, projectId) {
    const sql = "INSERT INTO equipments (equipment_name, equipment_details, equipment_date, equipment_unit_price, equipment_unit_quantity, equipment_total, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params = [equipmentName, equipmentDetails, equipmentDate, equipmentUnitPrice, equipmentUnitQuantity, equipmentTotal, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteEquipmentById(id) {
    const sql = "DELETE FROM equipments WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async editEquipmentById(equipmentName, equipmentDate, equipmentUnitPrice, equipmentUnitQuantity, equipmentDetails, equipmentTotal, id) {
    const sql = "UPDATE equipments SET equipment_name = ?, equipment_details = ?, equipment_date = ?, equipment_unit_price = ?, equipment_unit_quantity = ?, equipment_total = ? WHERE id = ?";
    const params = [equipmentName, equipmentDetails, equipmentDate, equipmentUnitPrice, equipmentUnitQuantity, equipmentTotal, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = DbService;