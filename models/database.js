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
  if (err) throw err.message;
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
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    const sql = "SELECT * FROM users";
    const params = [];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByUserName(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const params = [username];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addNewProject(projectName, projectAddress, projectStartDate, projectEndDate, userId) {
    const sql = "INSERT INTO projects (project_name, project_address, project_start_date, project_end_date, user_id) VALUES (?, ?, ?, ?, ?)";
    const params = [projectName, projectAddress, projectStartDate, projectEndDate, userId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProjectsByUserId(id) {
    const sql = "SELECT p.* FROM projects p LEFT JOIN users u ON p.user_id = u.id WHERE u.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editProjectById(id, nProjectName, nProjectAddress, nProjectStartDate, nProjectEndDate) {
    const sql = "UPDATE projects SET project_name = ?, project_address = ?, project_start_date = ?, project_end_date = ? WHERE id = ?";
    const params = [nProjectName, nProjectAddress,  nProjectStartDate, nProjectEndDate, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProjectById(id) {
    const sql = "DELETE FROM projects WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addNewEmployee(employeeName, employeeJob, employeePhoneNum, projectId) {
    const sql = "INSERT INTO employees (employee_name, employee_job, employee_phone_num, project_id) VALUES (?, ?, ?, ?)";
    const params = [employeeName, employeeJob, employeePhoneNum, projectId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getEmployeesByProjectId(id) {
    const sql = "SELECT e.* FROM employees e LEFT JOIN projects p ON e.project_id = p.id WHERE p.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteEmployeeById(id) {
    const sql = "DELETE FROM employees WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editEmployeeById(employeeId, nEmployeeName, nEmployeeJob, nEmployeePhoneNum) {
    const sql = "UPDATE employees SET employee_name = ?, employee_job = ?, employee_phone_num = ? WHERE id = ?";
    const params = [nEmployeeName, nEmployeeJob,  nEmployeePhoneNum, employeeId];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getEmployeeById(id) {
    const sql = "SELECT * FROM employees WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPurchasesByProjectId(id) {
    const sql = "SELECT r.* FROM purchases r LEFT JOIN projects p ON r.project_id = p.id WHERE p.id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addNewpurchase(name, unit, unitPrice, quantity, total, type, details, id) {
    const sql = "INSERT INTO purchases (purchase_name, purchase_details, purchase_type, purchase_unit, purchase_unit_price, purchase_unit_quantity, purchase_total, project_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [name, details, type, unit, unitPrice, quantity, total, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePurchaseById(id) {
    const sql = "DELETE FROM purchases WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPurchaseById(id) {
    const sql = "SELECT * FROM purchases WHERE id = ?";
    const params = [id];

    try {
      const result = await this.runQuery(sql, params);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editPurchaseById(name, unit, unitPrice, quantity, total, type, details, id) {
    const sql = "UPDATE purchases SET purchase_name = ?, purchase_details = ?, purchase_type = ?, purchase_unit = ?, purchase_unit_price = ?, purchase_unit_quantity = ?, purchase_total = ? WHERE id = ?";
    const params = [name, details, type, unit, unitPrice, quantity, total, id];

    try {
      const result = await this.runQuery(sql, params);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = DbService;