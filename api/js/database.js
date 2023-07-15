// Importiranje potrebnih modula
const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require("cors");

// Stvaranje veze s bazom podataka
const configObject = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root123",
  database: "foodweb"
};
const connection = mysql.createConnection(configObject);

// Povezivanje s bazom podataka
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});

// Konfiguriranje Express aplikacije
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta za registraciju korisnika
app.post('http://localhost:3000', (req, res) => {
  const { name, email, number, pass } = req.body;

  // Generiranje hash vrijednosti lozinke
  const hashedPassword = bcrypt.hashSync(pass, 10);

  // Priprema objekta za unos u bazu podataka
  const newUser = {
    name: name,
    email: email,
    number: number,
    password: hashedPassword
  };

  // Izvršavanje upita za unos korisnika u bazu podataka
  connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
    if (error) {
      console.log('Error inserting user into the database:', error);
      res.status(500).json({ message: 'Failed to register user' });
    } else {
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// Pokretanje servera
const port = 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});


