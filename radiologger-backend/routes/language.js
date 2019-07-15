var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {

  let pool = res.locals.pool
  let conn
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM language");
    res.send(JSON.stringify(rows))
  } catch (err) {
  	throw err;
  } finally {
	  if (conn) return conn.end();
  }
});

module.exports = router;