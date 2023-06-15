const mysql = require('mysql2');

const db = mysql.createPool({
 host: '127.0.0.1',
 user: 'root',
 database: 'photodb',
 password: 'SQL1king'
});

module.exports = db.promise();
