const mysql = require('mysql');

module.exports = {
  getCon: () => mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurants"
  }),
  functions: mysql
};