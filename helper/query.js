const mysql = require("mysql");
const mysqlConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "",
  database: process.env.MYSQL_DB || "employees_db",
};

exports.execute = (statement) => {
  const connection = mysql.createConnection(mysqlConfig);
  connection.connect();
  const response = new Promise((resolve, reject) => {
    connection.query(statement, (err, rows) => {
      if (err) {
        resolve({
          status: "error",
          message: err,
          data: null,
        });
      } else {
        resolve({
          status: "success",
          message: null,
          data: rows,
        });
      }
    });
  });
  connection.end();
  return response;
};

exports.execute_bulk = (statement, values) => {
  const connection = mysql.createConnection(mysqlConfig);
  connection.connect();
  const response = new Promise((resolve, reject) => {
    connection.query(statement, [values], (err, rows) => {
      if (err) {
        resolve({
          status: "error",
          message: err,
          data: null,
        });
      } else {
        resolve({
          status: "success",
          message: null,
          data: rows,
        });
      }
    });
  });
  connection.end();
  return response;
};
