const connection = require('./connection.js')
// --manager id null if employee has no manager
// -- need iquirer, mysql2, and console.table pckg

// View All Roles

//Add Role

//Update employee Role
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});


//View All Employees
  // Read list of all reviews and associated movie name using LEFT JOIN
  app.get('/api/movie-reviews', (req, res) => {
    const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

//Add Employee

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
// app.post('/api/new-dept', ({ body }, res) => {
  const sql = `INSERT INTO departments (dept_name)
    VALUES (?)`;
  const params = [body.dept_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
// });