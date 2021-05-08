const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "",

  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});
//List questions to answer
const runSearch = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit",
      ],
    })

    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Employees By Department":
          viewAllEmpByDep();
          break;
        case "View All Employees By Role":
          viewAllEmpByRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};
// View All Employees
const viewAllEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    runSearch();
  });
};
//Vieww All Employee By Department
const viewAllEmpByDep = () => {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};
//View All Employees By Role
const viewAllEmpByRole = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};
//Adds Employees
const addEmployee = () => {
  console.log("Inserting a new employee.\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "First Name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "Last Name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: [1, 2, 3],
      },
    ])
    .then(function (res) {
      const employee = res.employee;
      const query = `INSERT INTO department (name) VALUES("${employee}")`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};
//Adds Departments
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "department",
    })
    .then(function (res) {
      const department = res.department;
      const query = `INSERT INTO department (name) VALUES("${department}")`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};
//Adds Employee Roles
const addRole = () => {
  inquirer
    .prompt([
      {
        message: "enter title:",
        type: "input",
        name: "title",
      },
      {
        message: "enter salary:",
        type: "number",
        name: "salary",
      },
      {
        message: "enter department ID:",
        type: "number",
        name: "department_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) values (?, ?, ?)",
        [response.title, response.salary, response.department_id],
        function (err, data) {
          console.table(data);
        }
      );
      runSearch();
    });
};
//Updates Employee Role
const updateEmpRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate",
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id=? WHERE first_name= ?",
        [answer.updateRole, answer.employeeUpdate],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
};
