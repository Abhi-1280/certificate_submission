var con = require('./connection');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/register.html');
});

app.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;

    con.connect(function (error) {
        if (error) {
            console.error('Error connecting to the database: ' + error);
            return;
        }

        var sql = "INSERT INTO students (name, email, mno) VALUES (?, ?, ?)";
        con.query(sql, [name, email, mno], function (error, result) {
            con.end(); // Close the connection

            if (error) {
                console.error('Error inserting data: ' + error);
                res.status(500).send("An error occurred");
            } else {
                res.send("Student registered successfully with ID: " + result.insertId);
            }
        });
    });
});

// Listen on port 5000
app.listen(8000, function () {
    console.log('Server is running on port 8000');
});
