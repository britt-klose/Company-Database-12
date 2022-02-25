const inquirer = require('inquirer');
require ('console.table');
const connection = require('./connection')

//Function inquirer
const deptArray =[];

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
                addDepartmment();
                break;   
        }
    })
}
startingPrompt();


// Function: VIEW all EMPLOYEES
function viewAllEmployees(){
    const sql = `SELECT id, first_name, last_name AS title FROM employees`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(error)
         return;
      }
      console.table(rows)
      });
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
    // Say (employee name) has been added to database
    //then bring back to main menu
]);
}

// Function: UPDATE EMPLOYEE
// function updateRole(){

// }

//Function: VIEW all ROLES
function viewAllRoles(){
    const sql = `SELECT id, title, salary AS title FROM roles`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(error)
         return;
      }
      console.table(rows)
      });
}

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
        name: 'select-dept',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    },
    //say (role) has been added to database
    //then bring back to main menu
    
]);
}


// Function: to VIEW all the DEPTS
function viewAllDepts(){
    const sql = `SELECT id, dept_name AS title FROM departments`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(error)
         return;
      }
      console.table(rows)
      });
}

// Function: to ADD a DEPT
function addDepartmment() {
inquirer
.prompt([
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'dept',
    },
    //say dept name has been added to database
    //then bring back to main menu
])
    .then(departmentData =>{
        console.log(departmentData)
        //todo: db query to add dept goes here
    })
}
