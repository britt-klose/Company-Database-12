const inquirer = require('inquirer');
require ('console.table');
const connection = require('./connection')
//const constructor = require('./constructor')

//Function inquirer
//const deptArray =[];

// Starting function 
const startingPrompt = () => {
    inquirer
    .prompt([
        {
        // think update role is a bonus option
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

// Manager array
var mgnrArray =[];
function manager(){
    connection.query(`SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL`, 
    (err, result) =>{
        if (err){
            console.log(err);
            for (let i = 0; i < result.length; i++) {
                mgnrArray.push(result[i].id + ' ' + result[i].first_name + ' ' + result[i].last_name);
                
            };
        }
    })
    return mgnrArray;
}

// Function: to ADD an EMPLOYEE
function addEmployees(){
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
        choices: ["Account Manager", 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Sales Lead', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'mngr',
        choices: ["None", 'Michael Scott', 'John Snow', 'Taylor Swift', 'Ann Perkins', ]
    },
])
    .then(employeeData =>{
    console.log(employeeData)
    const sql =`SELECT id FROM employees WHERE first_name = ${manager.first_name} AND last_name ${manager.last_name}
     INSERT INTO employees ?`;
  const params = [employeeData.first, employeeData.last, employeeData.job, employeeData.mngr];
  connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.table(rows)
    console.log(`Employee ${first} ${last} added successfully.`)
    startingPrompt()
  });
    })
};

// Function: UPDATE EMPLOYEE
function updateRole(){
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'update',
            choices:['MichaelScott', 'Roland Whitethorn', 'Louis Venuti','John Snow', 'Sansa Stark', 'Jaime Lannister', 'Taylor Swift', 'Pam Beesly', 'Leslie Nope', 'Jan Levins', 'Ann Perkins', 'Cassandra Clare', 'Daenerys Targaryan']
        },
        {
            type: 'list',
            message: "Which role do you want to assign to selected employee?",
            name: 'up_role',
            choices:["Account Manager", 'Accountant','Salesperson', 'Lead Engineer', 'Software Engineer', 'Sales Lead', 'Legal Team Lead', 'Lawyer', 'Customer Service']
        },
    ])
    .then(employeeData =>{
        console.log(employeeData)
    const sql = `SELECT employees.last_name, roles.title FROM employees JOIN roles on employees.role_id = roles.id;
    UPDATE employees SET role_id = ? WHERE last_name = ?`;
    const params = [employeeData.update, employeeData.up_role];
    connection.query(sql, params, (err, result) => {
      if (err) {
        console.log(err)
        return;
      } else if (!result.affectedRows) {
        console.log("role not found.")
      } else {
        console.table(rows)
        console.log("Employee role updated successfully.")
        startingPrompt()
      }
    });
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
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    }
])
    .then(roleData =>{
        console.log(roleData)
        const sql = `SELECT * FROM departments WHERE dept_name = '${roleData.dept}'`;
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
                return;
               }
            console.log(rows)
        const sql2 = `INSERT INTO roles SET ?`;
        const params = {title: roleData.name, salary: roleData.salary, department_id: rows[0].id};
        connection.query(sql2, params, (err, rows) => {
         if (err) {
        console.log(err)
        return;
        }
        console.table(rows)
        console.log(`Role added successfully.`)
        startingPrompt()
        })
    })
})


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
