const userDB = require("./userDB");

userDB.getUsers(function (err, results, fields) {
    console.log(results);
});
