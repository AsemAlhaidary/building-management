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

  async checkUsername(username) {
    const users = await this.getAllUsers();

    if (users.find(user => user.username === username)) {
      return true;
    } else {
      return false;
    }
  }

  async getAllUsers() {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM \`users\`";
        con.query(sql, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addNewUser(name, username, password) {
    try {
      if (this.checkUsername(username)) {
        throw new Error('The user name is already exists');
      }
      await new Promise((resolve, reject) => {
        let sql = "INSERT INTO users (name, username, password) VALUES (?, ?, ?)";
        con.query(sql, [name, username, password], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

    } catch (error) {
      throw new Error('The user name is already exists');
    }
  }

  async addNewProject(projectName, projectAddress, projectStartDate, projectEndDate, userId) {
    try {
      await new Promise((resolve, reject) => {
        let sql = "INSERT INTO projects (project_name, project_address, project_start_date, project_end_date, user_id) VALUES (?, ?, ?, ?, ?)";
        con.query(sql, [projectName, projectAddress, projectStartDate, projectEndDate, userId], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByUserName(username) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE username = ?";
        con.query(sql, [username], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProjectById(id) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT FROM projects WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProjectById(id) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM projects WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAllProjects() {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM projects";
        con.query(sql, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProjectById(id) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "DELETE FROM projects WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editProjectById(id, nProjectName, nProjectAddress, nProjectStartDate, nProjectEndDate) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "UPDATE projects SET project_name = ?, project_address = ?, project_start_date = ?, project_end_date = ? WHERE id = ?";

        con.query(sql, [nProjectName, 
                        nProjectAddress,  
                        nProjectStartDate, 
                        nProjectEndDate, 
                        id], 
                        (err, result) => {
          if (err) reject(new Error(err.message));

          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = DbService;