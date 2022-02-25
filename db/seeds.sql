INSERT INTO departments (dept_name)
VALUES ("Engineering"),
       ("Finance");
       ("Legal");
       ("Sales");
       ("Service");

INSERT INTO roles (department_id, salary, title)
VALUES  (1, 160000, "Account Manager"),
        (2, 125000, "Accountant");
        (3, 150000, "Lead Engineer");
        (4, 120000, "Software Engineer");
        (5, 100000, "Sales Lead");
        (6, 80000, "Salesperson");
        (7, 80000, "Customer Service");
        (8, 250000, "Legal Team Lead");
        (9, 190000, "Lawyer");
        

INSERT INTO employees (role_id, manager_id, first_name, last_name)
VALUES (1, NULL, "Michael", 'Scott'),
       (2, 1, "Roland", 'Whitethorn');
       (2, 1, "Taylor", "Swift");
       (3, NULL, "John", "Snow");
       (4, 2, "Sansa", "Stark");
       (4, 2, "Jaime", "Lannister");
       (5, NULL, "Louis", "Venuti");
       (6, 3, "Pam", "Beesly");
       (6, 3, "Leslie", "Nope");
       (7, 3, "Jan", "Levins");
       (8, NULL, "Ann", "Perkins");
       (9, 4, "Cassandra", "Clare");
       (9, 4, "Daenerys", "Targaryan");
       
       
       
     

