const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 8080,

  user: "root",

  password: "",

  database: "employee",
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer.prompt({});
};
