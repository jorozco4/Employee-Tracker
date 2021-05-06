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

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Accountant", 125000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (2, "Lead Engineer", 120000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (3, "Assistant Director", 100000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (4, "Sales Lead", 95000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (5, "Lawyer", 150000, 5);

-- Employee info

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(1, "John", "Doe", 1, Null );

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2, "Mike", "Chan", 2, Null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3, "Ashley", "Rodgriuez", 3, 3 );

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4, "Kevin", "Tupik", 4, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5, "Sarah", "Lourd", 5, 5);

