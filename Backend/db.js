const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user:"root",
    password:"S@i32002",
    database:"blogger"

})


module.export = connection;