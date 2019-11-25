const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('index', {title: 'Home'}));
app.get('/index', (req, res) => res.render('index', {title: 'Home'}));

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DB,
  multipleStatements: true
});

con.connect(err => {
  if (err) {
    throw err;
  }
  con.query('CREATE TABLE IF NOT EXISTS bank_accounts (' +
      'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
      'owner VARCHAR(255) NOT NULL UNIQUE,' +
      'amount DOUBLE NOT NULL)');
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Alfred', '1000.0'], (err, result) => {});
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Bert', '1500.0'], (err, result) => {});
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Chris', '2100.0'], (err, result) => {});
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Dieter', '5040.0'], (err, result) => {});
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Emil', '5400.0'], (err, result) => {});
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Frederick', '2300.0'], (err, result) => {});
  con.query('INSERT INTO bank_accounts (owner, amount) VALUES (?, ?)', ['Malory', '1.0'], (err, result) => {});
});

app.get('/list', (req, res) => {
  con.query('SELECT * FROM bank_accounts', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// TODO enable multiline query in db, lookup how that works
app.post('/search', (req, res) => {
  let query = `SELECT * FROM bank_accounts WHERE owner = "${req.body.query}";`;
  console.log(query);
  con.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = app;
