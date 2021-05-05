const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",

  database: "employee2_DB",
});

// const afterConnection = () => {
//   connection.query("SELECT * FROM departments", (err, res) => {
//     if (err) throw new Error(err);
//     console.log(res);
//     connection.end();
//   });
// };

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      type: "list",
      name: "answerQuestion",
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
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
      console.log(answer);
    });
};
const employeeSearch = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};
const departmentSearch = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

// afterConnection();
