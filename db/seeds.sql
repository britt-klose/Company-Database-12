INSERT INTO departments (dept_name)
VALUES ("test"),
       ("forever");

INSERT INTO roles (department_id, salary, title)
VALUES (1, 300000, "runaway"),
       (2, 400000, "again");

INSERT INTO employees (role_id, manager_id, first_name, last_name)
VALUES (1, NULL, "Jerry", 'Smith'),
       (2, 1, "Roland", 'Fetsburg');

