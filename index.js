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
            case 'View All Departments':
            viewAllDepts();
            break;
        }
    })
}
startingPrompt();

//function
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

//if they pick add dept
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
    .then(department.Data)
}
//if they pick add role
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

// If they pick add employee
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
        choices: ["Sales Lead", 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'mngr',
        choices: ["None", 'John Doe', 'Michael Scott', 'David Smith', 'Bethany Hamilton', 'Michelle Obama', 'Haley Luciani']
    },
    // Say (employee name) has been added to database
    //then bring back to main menu
]);

//if they pick view (employees, roles, depts) return tables from schema and seeds databases

