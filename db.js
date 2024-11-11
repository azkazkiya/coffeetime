// backend/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Sesuaikan dengan user MySQL Anda
    password: '',       // Sesuaikan dengan password MySQL Anda
    database: 'dbcoffeedrinknote'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Terhubung ke database MySQL');
});

module.exports = db;
