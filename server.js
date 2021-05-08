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
        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};

const viewAllEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    runSearch();
  });
};

const viewAllEmpByDep = () => {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewAllEmpByRole = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

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
      {
        type: "input",
        message: "Who is their manager?",
        name: "manager_id",
      },
    ])
    .then(function (res) {
      const query = connection.query(
        "INSERT INTO employees SET ?",
        res,
        function (err, res) {
          if (err) throw err;
          console.log("Employee added!\n");

          runSearch();
        }
      );
    });
};

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
