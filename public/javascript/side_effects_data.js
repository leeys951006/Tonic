const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('side_effects.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the side_effects.db database');
});

db.run(`CREATE TABLE IF NOT EXISTS side_effects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  effect TEXT NOT NULL,
  example TEXT
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
});

let insert = 'INSERT INTO side_effects (name, type, effect, example) VALUES (?, ?, ?, ?)';

const sideEffects = [
  ['비타민A', 'overdose', '과립증 (골다공증), 간 손상, 혼돈, 피부 건강 악화', '성인 남성에서 900 µg을 초과하면 중독의 위험이 있습니다.'],
  ['비타민D', 'overdose', '칼슘 흡수 증가로 인한 과립증, 혈액 내 칼슘 농도 증가', '성인에서 4000 IU (100 µg) 이상 복용 시 칼슘 중독의 위험이 있습니다.'],
  ['비타민C', 'overdose', '소화 장애 (구토, 복통, 설사), 신장 결석 형성 가능성', '성인에서 일일 섭취량을 크게 초과하면 소화 시스템에 부담을 줄 수 있습니다.'],
  ['철', 'overdose', '소화 장애, 구토, 복통, 간독성', '성인에서 일일 섭취량을 크게 초과하면 독성의 위험이 있습니다.'],
  ['아연', 'overdose', '구토, 설사, 신경 독성', '아연을 과도하게 섭취하면 면역 기능에 부정적인 영향을 줄 수 있습니다.'],
  ['비타민A', 'deficiency', '야맹증, 면역 기능 저하, 시력 문제', '비타민 A 결핍은 시력 문제와 면역 기능 저하를 초래할 수 있습니다.'],
  ['비타민D', 'deficiency', '골다공증, 뼈 손상, 근육 약화', '비타민 D 결핍은 뼈 건강에 부정적인 영향을 줄 수 있습니다.'],
  ['비타민C', 'deficiency', '구루병(비타민 C 결핍병), 혈관 손상, 콜라겐 생성 저하', '비타민 C 결핍은 구루병과 같은 심각한 상태를 초래할 수 있습니다.'],
  ['철', 'deficiency', '빈혈, 체중 감소, 에너지 부족', '철분이 부족하면 혈구 생성에 문제가 생기며, 이는 지속적으로 에너지 수준을 낮출 수 있습니다.'],
  ['아연', 'deficiency', '면역 기능 저하, 상처 치유 지연, 성장 장애', '아연 결핍은 면역 기능 저하와 상처 치유 능력 저하를 초래할 수 있습니다.']
];

sideEffects.forEach((effect) => {
  db.run(insert, effect, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection');
});
