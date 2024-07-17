const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('tonic.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tonic.db database');
});

db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, tonic TEXT NOT NULL, recommend TEXT NOT NULL)`, (err) => {
  if (err) {
    console.error(err.message);
  }
});

let insert = 'INSERT INTO users (tonic, recommend) VALUES (?, ?)';
db.run(insert, ['VitaminA', '900 µg']);
db.run(insert, ['VitaminA', '700 µg']);

db.all('SELECT * FROM users', [], (err,rows) => {
  if(err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

db.close((err) => {
  if(err) {
    console.error(err.message)
  };
  console.log('Close the database connection');
});