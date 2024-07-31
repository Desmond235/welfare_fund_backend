const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "church_db"
});

conn.connect((err) => {
    if(err) throw `Error connecting to database: ${err}`;
    console.log("connected to database successfully");
});

module.exports = conn;


