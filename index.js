const inquirer = require('inquirer');
const fs = require('fs');

//Function inquirer
const deptArray =[];

const viewDataBase = () => {
return(
    inquirer
    .prompt([
        {
        // think update role is a bonus option
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View All Employees','Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        },
    ])
)
}

//if they pick add dept
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