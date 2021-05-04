const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 8080,

  user: "root",

  password: "",

  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })

    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          employeeSearch();
          break;

        case "View all employees by department":
          departmentSearch();
          break;

        case "View all employees by manager":
          managerSearch();
          break;

        case "Update employee":
          updateEmployeeSearch();
          break;

        case "Remove Employee":
          removeEmployeeSearch();
          break;

        case "Update Employee Role":
          roleSearch();
          break;

        case "Update Employee Manager":
          updateManagerSearch();
          break;
      }
    });
};
