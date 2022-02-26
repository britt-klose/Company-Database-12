const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Jasper69@omg',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  db.connect(function (err){
    if (err) throw err;
  })

  module.exports=db