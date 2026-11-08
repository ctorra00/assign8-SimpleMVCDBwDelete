const express = require('express');
const userDB = require('./models/userDB');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.get('/', function (req, res, next) {
    userDB.getUsers(function (err, users) {
        if (err) return next(err);
        res.render('manageUsers', { users: users });
    });
});


app.get('/users/new', function (req, res) {
    res.render('addUser');
});


app.post('/users', function (req, res, next) {
    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        passwd: req.body.passwd
    };

    if (!user.fname || !user.lname || !user.username || !user.passwd) {
        return res.status(400).send('All fields are required. Please go back and try again.');
    }

    userDB.addUser(user, function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

app.post('/users/:id/delete', function (req, res, next) {
    const userID = req.params.id;

    if (!/^[1-9]\d*$/.test(userID)) {
        return res.status(400).send('Invalid user ID');
    }

    userDB.deleteUser(userID, function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

app.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
});