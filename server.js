const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",

  database: "employee_DB",
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
        case "Add Employee":
          addEmployeeSearch();
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

const addEmployeeSearch = () => {
  console.log("Inserting an employee!");

  const query = `SELECT r.id, r.title, r.salary 
      FROM role r`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const selectRole = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    insertEmployee(selectRole);
  });
};

const insertEmployee = () => {
  inquirer
    .prompt([
      {
        name: "fistname",
        type: "input",
        message: "Enter their first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name?",
      },
      {
        name: "roleid",
        type: "input",
        message: "What is their role id?",
        choices: "selectRole",
      },
      {
        name: "managerid",
        type: "input",
        message: "What is their manager id?",
        choices: "selectManager",
      },
    ])
    .then(function (answer) {
      console.log(answer);

      const query = `INSERT INTO employee SET ?`;

      connection.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerid,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          runSearch();
        }
      );
    });
};
// afterConnection();
