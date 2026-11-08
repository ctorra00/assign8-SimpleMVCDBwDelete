const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'assignDBuser',
    password: 'assignDBpass',
    database: 'assignDB'
});

function getUsers(callback) {
    const sql = 'SELECT userID, fname, lname, username FROM users';

    connection.execute(sql, function (err, results) {
        callback(err, results);
    });
}

function addUser(userData, callback) {
    const sql = 'INSERT INTO users (fname, lname, username, passwd) VALUES (?, ?, ?, ?)';

    const values = [
        userData.fname,
        userData.lname,
        userData.username,
        userData.passwd
    ];

    connection.execute(sql, values, function (err, results) {
        callback(err, results);
    });
}


function deleteUser(userID, callback) {
    const sql = 'DELETE FROM users WHERE userID = ?';

    connection.execute(sql, [userID], function (err, results) {
        callback(err, results);
    });
}

module.exports = { getUsers, addUser, deleteUser };