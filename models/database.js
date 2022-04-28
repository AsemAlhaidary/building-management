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
  if (err) throw err;
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getData() {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM \`users\`;";
        con.query(sql, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async insertUser(name, username, password) {
    try {
      const result = await new Promise((resolve, reject) => {
        let sql = "INSERT INTO users (name, username, password) VALUES (?, ?, ?)";
        con.query(sql, [name, username, password], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(username) {
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
      console.log(error);
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
      console.log(error);
    }
  }
}

module.exports = DbService;