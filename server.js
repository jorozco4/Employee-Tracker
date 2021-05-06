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
        "View All Employees By Manager Role",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })

    .then((answer) => {
      console.log(answer.answerQuestion);
      switch (answer.answerQuestion) {
        case "View All Employees":
          employeeSearch();
          break;
        case "View All Employees By Department":
          departmentSearch();
          break;
        case "View All Employees By Manager Role":
          managerSearch();
          break;
        case "Update Employee":
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
          console.log(`Invalid action: ${answer.answerQuestion}`);
          break;
      }
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

const managerSearch = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "fistname",
        type: "input",
        message: "Enter their first name",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is their role id",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "input",
        message: "What is manager id",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      const roleID = selectRole().indexof(val.role) + 1;
      const managerID = selectManager().indexof(val.choice) + 1;
      connection.query(
        "INSERT INTO employee SET?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
};
// afterConnection();
