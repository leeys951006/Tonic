const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const port = 3000;

app.use(express.static('public'));

let db = new sqlite3.Database('tonic.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tonic.db database');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'main.html'));
});

app.get('/information', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'information.html'));
});

app.get('/Shopping', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'Shopping.html'));
});

app.get('/setting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html', 'setting.html'));
});

app.get('/api/tonics', (req, res) => {
  let sql = 'SELECT * FROM tonic';
  const params = [];
  
  if (req.query.vitamin) {
    sql += ' WHERE vitamin = ?';
    params.push(req.query.vitamin);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port} 실행중`);
});
