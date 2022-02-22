const connection = require('./connection.js')
// --manager id null if employee has no manager
// -- need iquirer, mysql2, and console.table pckg
//---Should I make a query.sql file too?
//--first is null cuz its a manager. next one has a manager

// View all depts
    const sql = `SELECT id, dept_name AS title FROM departments`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(error)
         return;
      }
      console.log(rows)
      });
   
  