const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Optional: Serve static files

// MySQL database connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Your database password
    database: 'college',
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as ID ' + con.threadId);
});

// Route to serve the registration form
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Route to handle form submission and database insertion
app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mno = req.body.mno;

    // Perform form validation here if needed

    const sql = 'INSERT INTO students (name, email, mno) VALUES (?, ?, ?)';
    con.query(sql, [name, email, mno], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err);
            res.status(500).send('An error occurred');
        } else {
            res.send('Registration successful with ID: ' + result.insertId);
        }
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
