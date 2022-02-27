const connection = require('./connection.js')

// View All Roles
const sql = `SELECT roles.title AS Roles, roles.id, roles.salary, departments.dept_name AS Departments FROM roles LEFT JOIN departments on roles.department_id = departments.id ORDER BY roles.title;`;
connection.query(sql, (err, rows) => {
  if (err) {
   console.log(error)
     return;
  }
  console.log(rows)
  });

//Add Role
const sql = `INSERT INTO Roles (dept_name, title, salary)
    VALUES (?)`;
  const params = [body.dept_name, body.title, body.salary];
  connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(error)
      return;
     }
    console.log(rows)
    console.log(`Role ${title} added successfully.`)
  });

//Update employee Role
  const sql = `UPDATE roles SET role = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(error)
      return;
    } else if (!result.affectedRows) {
      console.log("role not found.")
    } else {
      console.log(rows)
      console.log("Employee role updated successfully.")
    }
  });


// View All Employees
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS Departments, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;`;
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(error)
        return;
      }
      console.log(rows)
    });


//Add Employee
const sql = `INSERT INTO employees (first_name, last_name, salary, role)
    VALUES (?)`;
  const params = [body.first_name, body.last_name, body.salary, body.role];
  connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(error)
      return;
     }
    console.log(rows)
    console.log(`Employee ${first_name} ${last_name} added successfully.`)
  });

// View all depts
    const sql = `SELECT id, dept_name AS title FROM departments`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(error)
         return;
      }
      console.log(rows)
      });

// Add a department
  const sql = `INSERT INTO departments (dept_name)
    VALUES (?)`;
  const params = [body.dept_name];
  connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(error)
      return;
     }
    console.log(rows)
    console.log(`Department ${dept_name}added successfully.`)
  });
