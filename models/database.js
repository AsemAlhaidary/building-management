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
}

// function insertUser(id, name, hashedPassword) {
//   let sql = `INSERT INTO \`users\` (\`id\`, \`name\`, \`phone\`) VALUES (${id}, '${name}', '${hashedPassword}')`

//   con.query(sql);
// }

// function checkUser(name) {
//   let sql = `SELECT * FROM users WHERE id = ${5}`;

//   // let finalResult = returned => returned ;

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     console.log(con.query(sql, (err, result, fields) => {
//       if (err) throw err;
//       // console.log(result[0]);
//       return result[0];
//       // finalResult(result[0]);
//       // return console.log(result[0]);
//     }));
//   });

//   // console.log(finalResult);
//   // return finalResult;
//   // const result = con.query(sql, (err, result, fields) => {
//   //   if (err) {
//   //     return console.log(err);
//   //   }

//   //   return console.log(result[0]);
//   // });

//   // return {
//   //   id: 5,
//   //   name: 'Asem',
//   //   phone: '$2b$10$/gnkUldR2CXGVcvqBYTdMu5gpOxUprZSAkduaOd6HX6QREsEEBkfK'
//   // };
// }

// function checkUserId(name) {
//   let sql = `SELECT * FROM users WHERE id = ${5}`;

//   const result = con.query(sql, (err, result, fields) => {
//     if (err) {
//       return console.log(err);
//     }

//     return console.log(result[0]);
//   });

//   return {
//     id: 5,
//     name: 'Asem',
//     phone: '$2b$10$/gnkUldR2CXGVcvqBYTdMu5gpOxUprZSAkduaOd6HX6QREsEEBkfK'
//   };
// }

module.exports = DbService;