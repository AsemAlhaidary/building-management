const { createPool } = require('mysql');

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "numbers"
});

function insertUser(id, name, hashedPassword) {
  let sql = `INSERT INTO \`users\` (\`id\`, \`name\`, \`phone\`) VALUES (${id}, '${name}', '${hashedPassword}')`

  pool.query(sql);
}

function checkUser(name) {
  let sql = `SELECT * FROM users WHERE id = ${5}`;

  const result = pool.query(sql, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }

    return console.log(result[0]);
  });

  return {
    id: 5,
    name: 'Asem',
    phone: '$2b$10$/gnkUldR2CXGVcvqBYTdMu5gpOxUprZSAkduaOd6HX6QREsEEBkfK'
  };
}

function checkUserId(name) {
  let sql = `SELECT * FROM users WHERE id = ${5}`;

  const result = pool.query(sql, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }

    return console.log(result[0]);
  });

  return {
    id: 5,
    name: 'Asem',
    phone: '$2b$10$/gnkUldR2CXGVcvqBYTdMu5gpOxUprZSAkduaOd6HX6QREsEEBkfK'
  };
}

module.exports = {
  insertUser,
  checkUser,
  checkUserId
};