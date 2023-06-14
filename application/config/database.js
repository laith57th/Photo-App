const mysql = require('mysql2');

const db = mysql.createPool({
 host: 'localhost',
 user: 'root',
 database: 'photodb',
 password: 'change this to root pwd'
});

module.exports = db.promise();