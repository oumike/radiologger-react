var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {

  let pool = res.locals.pool
  let conn
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM radioshow");
    res.send(JSON.stringify(rows))
  } catch (err) {
  	throw err;
  } finally {
	  if (conn) return conn.end();
  }

 	// res.locals.pool.query('SELECT * from radioshow', function (error, results, fields) {
	// 	if(error) throw error;
	// 	res.send(JSON.stringify(results));
	// });
});

module.exports = router;