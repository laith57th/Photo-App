const mysql = require('mysql2');

const db = mysql.createPool({
 host: '10.0.2.15',
 user: 'laith',
 database: 'photodb',
 password: 'SQL@1king'
});

module.exports = db.promise();
