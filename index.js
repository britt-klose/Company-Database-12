const inquirer = require('inquirer');
require ('console.table');
const connection = require('./connection')


// Starting function 
const startingPrompt = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View All Employees','Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        },
    ]).then(userChoice => {
        console.log(userChoice)
        switch(userChoice.menu){
            case 'View All Employees':
            viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployees();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;  
            case 'View All Departments':
                viewAllDepts();
                break;      
            case 'Add Department':
                addDepartment();
                break;   
        }
    })
};
startingPrompt();


// Function: VIEW all EMPLOYEES
function viewAllEmployees(){
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS Departments, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(err)
         return;
      }
      console.table(rows)
      startingPrompt()
      });
};

// Function: to ADD an EMPLOYEE
function addEmployees(){
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, rows1) => {
        if (err) {
            console.log(err)
            return;
           }
    let roles = rows1.map(role => {
        return {
            name: role.title, value: role.id
        }
    })
    const sql2 = `SELECT * FROM employees WHERE manager_id IS NULL`;
    connection.query(sql2, (err, rows2) => {
        if (err) {
            console.log(err)
            return;
           }
    let mngrs = rows2.map(mngr => {
        return {
            name: mngr.first_name + ' ' + mngr.last_name, value: mngr.id
        }
    })
inquirer
.prompt([
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last',
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'job',
        choices: roles
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'mngr',
        choices: mngrs
    },
])
    .then(employeeData => {
    console.log(employeeData)
    const sql3 = `INSERT INTO employees SET ?`;
    const params = {first_name: employeeData.first, last_name: employeeData.last, role_id: employeeData.job, manager_id: employeeData.mngr};
    connection.query(sql3, params, (err, rows) => {
            if (err) {
            console.log(err)
            return;
            }
        console.table(rows)
        console.log(`Employee ${employeeData.first} ${employeeData.last} added successfully.`)
        startingPrompt()
    })
    })
})
})
};

// Function: UPDATE EMPLOYEE
function updateRole(){
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, rows1) => {
        if (err) {
            console.log(err)
            return;
           }
        console.log(rows1)
    let roles = rows1.map(role => {
        return {
            name: role.title, value: role.id
        }
    })
    const sql2 = `SELECT * FROM employees`;
    connection.query(sql2, (err, rows2) => {
        if (err) {
            console.log(err)
            return;
           }
        console.log(rows2)
    let employees = rows2.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name, value: employee.id
        }
    })
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'update',
            choices: employees
        },
        {
            type: 'list',
            message: "Which role do you want to assign to selected employee?",
            name: 'up_role',
            choices: roles
        },
    ])
    .then(employeeData =>{
        console.log(employeeData)
    const sql3 = `UPDATE employees SET role_id=? WHERE id= ?`;
    const params = [employeeData.up_role, employeeData.update];
    connection.query(sql3, params, (err, rows) => {
      if (err) {
        console.log(err)
        return;
      } else {
        console.table(rows)
        console.log("Employee role updated successfully.")
        startingPrompt()
      }
    });
})
})
})
};

// Function: VIEW all ROLES
function viewAllRoles(){
    const sql = `SELECT roles.title AS Roles, roles.id, roles.salary, departments.dept_name AS Departments FROM roles LEFT JOIN departments on roles.department_id = departments.id ORDER BY roles.title;`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(err)
         return;
      }
      console.table(rows)
      startingPrompt()
      });
};

//Function: to ADD a ROLE
function addRole(){
    const sql = `SELECT * FROM departments`;
        connection.query(sql, (err, rows1) => {
            if (err) {
                console.log(err)
                return;
               }
               let newDept = rows1.map(dept => {
                return {
                    name: dept.dept_name, value: dept.id
                }
            })
inquirer
.prompt([
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'dept',
        choices: newDept
    }
])
    .then(roleData =>{
        console.log(roleData)
       
        const sql2 = `INSERT INTO roles SET ?`;
        const params = {title: roleData.name, salary: roleData.salary, department_id: roleData.dept};
        connection.query(sql2, params, (err, rows) => {
         if (err) {
        console.log(err)
        return;
        }
        console.table(rows)
        console.log(`Role ${roleData.name} added successfully.`)
        startingPrompt()
        })
    })
})
}

// Function: to VIEW all the DEPTS
function viewAllDepts(){
    const sql = `SELECT id, dept_name AS Departments FROM departments`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(err)
         return;
      }
      console.table(rows)
      startingPrompt()

      });
}

// Function: to ADD a DEPT
function addDepartment() {
inquirer
.prompt([
    {
        type: "input",
        message: "What is the name of the department?",
        name: "dept_name"
    }
])
    .then(departmentData => {
        console.log(departmentData)
        const sql = `INSERT INTO departments SET ?`;
    const params = {dept_name: departmentData.dept_name};
    connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.table(rows)
    console.log(`Department ${departmentData.dept_name} added successfully.`)
    startingPrompt()
  })
  })
}
