const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const chalk = require("chalk");
const figlet = require("figlet");

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
  // Solution so far to be able to reference an index for when choosing an employee role
  let roles = [
    "Accountant",
    "Lead Engineer",
    "Assistant Director",
    "Sales Lead",
    "Lawyer",
  ];

  inquirer
    .prompt([
      {
        message: "What would be the employee's role?",
        type: "list",
        name: "role",
        choices: roles,
      },
      {
        message: "What is the employees first name?",
        type: "input",
        name: "firstName",
      },
      {
        message: "What is the employees last name?",
        type: "input",
        name: "lastName",
      },
    ])
    .then((answers) => {
      connection.query(
        `
           INSERT INTO employee SET ?`,
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: roles.indexOf(answers.role) + 1, // This line has to be an INT
        },

        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
};
//Adds Departments
const addDepartment = () => {
  inquirer
    .prompt([
      {
        message: "What is the name of the Department?",
        type: "input",
        name: "newDept",
      },
    ])
    .then((answers) => {
      connection.query(
        `
           INSERT INTO department SET ?`,
        {
          name: answers.newDept,
        },
        (err, result) => {
          if (err) throw err;
        }
      );
      runSearch();
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
  let employees = [
    "John Doe",
    "Mike Chan",
    "Ashley Rodgriuez",
    "Kevin Tupik",
    "Sarah Lourd",
  ];

  let roles = [
    "Accountant",
    "Lead Engineer",
    "Assistant Director",
    "Sales Lead",
    "Lawyer",
  ];

  inquirer
    .prompt([
      {
        message: "Which Employee do you wish to update?",
        type: "list",
        name: "employee",
        choices: employees,
      },
      {
        message: "What is his/her new role?",
        type: "list",
        name: "role",
        choices: roles,
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employee (role_id) values (?, ?, ?)",
        [response.title, response.salary, response.department_id],
        function (err, data) {
          console.table(data);
        }
      );
      runSearch();
    });
};
