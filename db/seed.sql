USE employee_DB

-- Department info

INSERT INTO department (id, name)
VALUES (1,"Accountant");

INSERT INTO department (id, name) 
VALUES (2, "Lead Engineer");

INSERT INTO department (id, name)
VALUES (3, "Assistant Director");

INSERT INTO department (id, name)
VALUES (4, "Sales Lead");

INSERT INTO department (id, name)
VALUES (5, "Lawyer");


-- Role info

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 125000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Assistant Director", 100000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 95000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 150000, 5);

-- Employee info

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES( "John", "Doe", 1, 1 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES( "Mike", "Chan", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Ashley", "Rodgriuez", 3, 3 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES( "Kevin", "Tupik", 4, 4);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES("Sarah", "Lourd", 5, 5);




