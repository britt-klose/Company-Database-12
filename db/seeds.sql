INSERT INTO departments (dept_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Service");

INSERT INTO roles (department_id, salary, title)
VALUES  (2, 160000, "Account Manager"),
        (2, 125000, "Accountant"),
        (1, 150000, "Lead Engineer"),
        (1, 120000, "Software Engineer"),
        (4, 100000, "Sales Lead"),
        (4, 80000, "Salesperson"),
        (5, 80000, "Customer Service"),
        (3, 250000, "Legal Team Lead"),
        (3, 190000, "Lawyer");
        

INSERT INTO employees (role_id, manager_id, first_name, last_name)
VALUES (1, NULL, "Michael", 'Scott'),
       (2, 1, "Roland", 'Whitethorn'),
       (2, 1, "Louis", "Venuti"),
       (3, NULL, "John", "Snow"),
       (4, 2, "Sansa", "Stark"),
       (4, 2, "Jaime", "Lannister"),
       (5, NULL, "Taylor", "Swift"),
       (6, 3, "Pam", "Beesly"),
       (6, 3, "Leslie", "Nope"),
       (7, 3, "Jan", "Levins"),
       (8, NULL, "Ann", "Perkins"),
       (9, 4, "Cassandra", "Clare"),
       (9, 4, "Daenerys", "Targaryan");
       
       
       
     

