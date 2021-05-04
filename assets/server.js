const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 8080,

  user: "root",

  password: "",

  database: "",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadid}`);
  afterConnection();
});
