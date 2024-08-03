const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('tonic.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tonic.db database');
});

db.run(`CREATE TABLE IF NOT EXISTS tonic (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  vitamin TEXT NOT NULL, 
  group TEXT NOT NULL,
  recommend TEXT NOT NULL
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
});

let insert = 'INSERT INTO tonic (vitamin, group, recommend) VALUES (?, ?, ?)';

const vitamins = [
  ['비타민A', '성인 남성', '900 µg'],
  ['비타민A', '성인 여성', '700 µg'],
  ['비타민A', '아이들 4-8세', '400 µg'],
  ['비타민A', '아이들 9-13세', '600 µg'],
  ['비타민B1', '성인 남성', '1.2 mg'],
  ['비타민B1', '성인 여성', '1.1 mg'],
  ['비타민B1', '아이들 4-8세', '0.6 mg'],
  ['비타민B1', '아이들 9-13세', '0.9 mg'],
  ['비타민B2', '성인 남성', '1.3 mg'],
  ['비타민B2', '성인 여성', '1.1 mg'],
  ['비타민B2', '아이들 4-8세', '0.6 mg'],
  ['비타민B2', '아이들 9-13세', '0.9 mg'],
  ['비타민B3', '성인 남성', '16 mg'],
  ['비타민B3', '성인 여성', '14 mg'],
  ['비타민B3', '아이들 4-8세', '8 mg'],
  ['비타민B3', '아이들 9-13세', '12 mg'],
  ['비타민B5', '성인', '5 mg'],
  ['비타민B5', '아이들 4-8세', '3 mg'],
  ['비타민B5', '아이들 9-13세', '4 mg'],
  ['비타민B6', '성인', '1.3-1.7 mg'],
  ['비타민B6', '아이들 4-8세', '0.6 mg'],
  ['비타민B6', '아이들 9-13세', '1 mg'],
  ['비타민B7', '성인', '30 µg'],
  ['비타민B7', '아이들 4-8세', '12 µg'],
  ['비타민B7', '아이들 9-13세', '20 µg'],
  ['비타민B9', '성인', '400 µg'],
  ['비타민B9', '아이들 4-8세', '200 µg'],
  ['비타민B9', '아이들 9-13세', '300 µg'],
  ['비타민B12', '성인', '2.4 µg'],
  ['비타민B12', '아이들 4-8세', '1.2 µg'],
  ['비타민B12', '아이들 9-13세', '1.8 µg'],
  ['비타민C', '성인 남성', '90 mg'],
  ['비타민C', '성인 여성', '75 mg'],
  ['비타민C', '아이들 4-8세', '25 mg'],
  ['비타민C', '아이들 9-13세', '45 mg'],
  ['비타민D', '성인', '600-800 IU (15-20 µg)'],
  ['비타민D', '아이들 4-8세', '600 IU (15 µg)'],
  ['비타민D', '아이들 9-13세', '600 IU (15 µg)'],
  ['비타민E', '성인', '15 mg'],
  ['비타민E', '아이들 4-8세', '7 mg'],
  ['비타민E', '아이들 9-13세', '11 mg'],
  ['비타민K', '성인 남성', '120 µg'],
  ['비타민K', '성인 여성', '90 µg'],
  ['비타민K', '아이들 4-8세', '55 µg'],
  ['비타민K', '아이들 9-13세', '60 µg'],
  ['칼슘', '성인', '1000-1200 mg'],
  ['칼슘', '아이들 4-8세', '1000 mg'],
  ['칼슘', '아이들 9-13세', '1300 mg'],
  ['철', '성인 남성', '8 mg'],
  ['철', '성인 여성', '18 mg'],
  ['철', '아이들 4-8세', '10 mg'],
  ['철', '아이들 9-13세', '8 mg'],
  ['마그네슘', '성인 남성', '400-420 mg'],
  ['마그네슘', '성인 여성', '310-320 mg'],
  ['마그네슘', '아이들 4-8세', '130 mg'],
  ['마그네슘', '아이들 9-13세', '240 mg'],
  ['아연', '성인 남성', '11 mg'],
  ['아연', '성인 여성', '8 mg'],
  ['아연', '아이들 4-8세', '5 mg'],
  ['아연', '아이들 9-13세', '8 mg'],
  ['셀레늄', '성인', '55 µg'],
  ['셀레늄', '아이들 4-8세', '30 µg'],
  ['셀레늄', '아이들 9-13세', '40 µg'],
  ['구리', '성인', '900 µg'],
  ['구리', '아이들 4-8세', '440 µg'],
  ['구리', '아이들 9-13세', '700 µg'],
  ['망간', '성인 남성', '2.3 mg'],
  ['망간', '성인 여성', '1.8 mg'],
  ['망간', '아이들 4-8세', '1.5 mg'],
  ['망간', '아이들 9-13세', '1.9 mg'],
  ['요오드', '성인', '150 µg'],
  ['요오드', '아이들 4-8세', '90 µg'],
  ['요오드', '아이들 9-13세', '120 µg'],
  ['칼륨', '성인', '4700 mg'],
  ['칼륨', '아이들 4-8세', '3800 mg'],
  ['칼륨', '아이들 9-13세', '4500 mg'],
  ['크롬', '성인 남성', '35 µg'],
  ['크롬', '성인 여성', '25 µg'],
  ['크롬', '아이들 4-8세', '15 µg'],
  ['크롬', '아이들 9-13세', '21 µg']
];

vitamins.forEach((vitamin) => {
  db.run(insert, vitamin, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

db.all('SELECT * FROM tonic', [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection');
});
