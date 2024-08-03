document.addEventListener('DOMContentLoaded', () => {
  const dataContainer = document.getElementById('Data');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const vitaminDetails = document.getElementById('vitaminDetails');

  const vitamins = [
    { name: '비타민A', categories: [{ group: '성인 남성', amount: '900 µg' }, { group: '성인 여성', amount: '700 µg' }, { group: '아이들 4-8세', amount: '400 µg' }, { group: '아이들 9-13세', amount: '600 µg' }], benefits: '시력 보호, 면역 기능 강화', overdose: '과립증 (골다공증), 간 손상, 혼돈, 피부 건강 악화', overdoseExample: '성인 남성에서 900 µg을 초과하면 중독의 위험이 있습니다.', deficiency: '야맹증, 면역 기능 저하, 시력 문제', deficiencyExample: '비타민 A 결핍은 시력 문제와 면역 기능 저하를 초래할 수 있습니다.' },
    { name: '비타민B1', categories: [{ group: '성인 남성', amount: '1.2 mg' }, { group: '성인 여성', amount: '1.1 mg' }, { group: '아이들 4-8세', amount: '0.6 mg' }, { group: '아이들 9-13세', amount: '0.9 mg' }], benefits: '에너지 생성, 신경 기능 강화', overdose: '', overdoseExample: '', deficiency: '각기병, 피로, 신경 손상', deficiencyExample: '비타민 B1 결핍은 각기병과 같은 심각한 상태를 초래할 수 있습니다.' },
    { name: '비타민B2', categories: [{ group: '성인 남성', amount: '1.3 mg' }, { group: '성인 여성', amount: '1.1 mg' }, { group: '아이들 4-8세', amount: '0.6 mg' }, { group: '아이들 9-13세', amount: '0.9 mg' }], benefits: '세포 성장, 에너지 생성', overdose: '', overdoseExample: '', deficiency: '구순염, 피부 질환, 눈의 피로', deficiencyExample: '비타민 B2 결핍은 구순염과 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민B3', categories: [{ group: '성인 남성', amount: '16 mg' }, { group: '성인 여성', amount: '14 mg' }, { group: '아이들 4-8세', amount: '8 mg' }, { group: '아이들 9-13세', amount: '12 mg' }], benefits: '소화기 건강, 에너지 생성', overdose: '', overdoseExample: '', deficiency: '피로, 피부 질환, 소화 문제', deficiencyExample: '비타민 B3 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민B5', categories: [{ group: '성인', amount: '5 mg' }, { group: '아이들 4-8세', amount: '3 mg' }, { group: '아이들 9-13세', amount: '4 mg' }], benefits: '호르몬 생성, 에너지 대사', overdose: '', overdoseExample: '', deficiency: '피로, 두통, 수면 장애', deficiencyExample: '비타민 B5 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민B6', categories: [{ group: '성인', amount: '1.3-1.7 mg' }, { group: '아이들 4-8세', amount: '0.6 mg' }, { group: '아이들 9-13세', amount: '1 mg' }], benefits: '단백질 대사, 면역 기능', overdose: '', overdoseExample: '', deficiency: '피로, 면역 기능 저하, 피부 질환', deficiencyExample: '비타민 B6 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민B7', categories: [{ group: '성인', amount: '30 µg' }, { group: '아이들 4-8세', amount: '12 µg' }, { group: '아이들 9-13세', amount: '20 µg' }], benefits: '머리카락, 손톱 건강', overdose: '', overdoseExample: '', deficiency: '피로, 피부 질환, 탈모', deficiencyExample: '비타민 B7 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민B9', categories: [{ group: '성인', amount: '400 µg' }, { group: '아이들 4-8세', amount: '200 µg' }, { group: '아이들 9-13세', amount: '300 µg' }], benefits: '세포 생성, 태아 발달', overdose: '', overdoseExample: '', deficiency: '피로, 빈혈, 면역 기능 저하', deficiencyExample: '비타민 B9 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민B12', categories: [{ group: '성인', amount: '2.4 µg' }, { group: '아이들 4-8세', amount: '1.2 µg' }, { group: '아이들 9-13세', amount: '1.8 µg' }], benefits: '신경 건강, 적혈구 생성', overdose: '', overdoseExample: '', deficiency: '피로, 빈혈, 신경 손상', deficiencyExample: '비타민 B12 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민C', categories: [{ group: '성인 남성', amount: '90 mg' }, { group: '성인 여성', amount: '75 mg' }, { group: '아이들 4-8세', amount: '25 mg' }, { group: '아이들 9-13세', amount: '45 mg' }], benefits: '항산화 작용, 면역 강화', overdose: '소화 장애 (구토, 복통, 설사), 신장 결석 형성 가능성', overdoseExample: '성인에서 일일 섭취량을 크게 초과하면 소화 시스템에 부담을 줄 수 있습니다.', deficiency: '구루병(비타민 C 결핍병), 혈관 손상, 콜라겐 생성 저하', deficiencyExample: '비타민 C 결핍은 구루병과 같은 심각한 상태를 초래할 수 있습니다.' },
    { name: '비타민D', categories: [{ group: '성인', amount: '600-800 IU or 15-20 µg' }, { group: '아이들 4-8세', amount: '600 IU or 15 µg' }, { group: '아이들 9-13세', amount: '600 IU or 15 µg' }], benefits: '뼈 건강, 면역 기능', overdose: '칼슘 흡수 증가로 인한 과립증, 혈액 내 칼슘 농도 증가', overdoseExample: '성인에서 4000 IU (100 µg) 이상 복용 시 칼슘 중독의 위험이 있습니다.', deficiency: '골다공증, 뼈 손상, 근육 약화', deficiencyExample: '비타민 D 결핍은 뼈 건강에 부정적인 영향을 줄 수 있습니다.' },
    { name: '비타민E', categories: [{ group: '성인', amount: '15 mg' }, { group: '아이들 4-8세', amount: '7 mg' }, { group: '아이들 9-13세', amount: '11 mg' }], benefits: '피부 건강, 항산화 작용', overdose: '', overdoseExample: '', deficiency: '피로, 면역 기능 저하, 피부 질환', deficiencyExample: '비타민 E 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '비타민K', categories: [{ group: '성인 남성', amount: '120 µg' }, { group: '성인 여성', amount: '90 µg' }, { group: '아이들 4-8세', amount: '55 µg' }, { group: '아이들 9-13세', amount: '60 µg' }], benefits: '혈액 응고, 뼈 건강', overdose: '', overdoseExample: '', deficiency: '피로, 면역 기능 저하, 피부 질환', deficiencyExample: '비타민 K 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '칼슘', categories: [{ group: '성인', amount: '1000-1200 mg' }, { group: '아이들 4-8세', amount: '1000 mg' }, { group: '아이들 9-13세', amount: '1300 mg' }], benefits: '뼈와 치아 건강', overdose: '', overdoseExample: '', deficiency: '골다공증, 뼈 손상, 근육 약화', deficiencyExample: '칼슘 결핍은 골다공증과 같은 상태를 초래할 수 있습니다.' },
    { name: '철', categories: [{ group: '성인 남성', amount: '8 mg' }, { group: '성인 여성', amount: '18 mg' }, { group: '아이들 4-8세', amount: '10 mg' }, { group: '아이들 9-13세', amount: '8 mg' }], benefits: '산소 운반, 에너지 생성', overdose: '소화 장애, 구토, 복통, 간독성', overdoseExample: '성인에서 일일 섭취량을 크게 초과하면 독성의 위험이 있습니다.', deficiency: '빈혈, 체중 감소, 에너지 부족', deficiencyExample: '철분이 부족하면 혈구 생성에 문제가 생기며, 이는 지속적으로 에너지 수준을 낮출 수 있습니다.' },
    { name: '마그네슘', categories: [{ group: '성인 남성', amount: '400-420 mg' }, { group: '성인 여성', amount: '310-320 mg' }, { group: '아이들 4-8세', amount: '130 mg' }, { group: '아이들 9-13세', amount: '240 mg' }], benefits: '근육 기능, 신경 기능', overdose: '', overdoseExample: '', deficiency: '피로, 근육 약화, 신경 기능 저하', deficiencyExample: '마그네슘 결핍은 피로와 같은 상태를 초래할 수 있습니다.' },
    { name: '아연', categories: [{ group: '성인 남성', amount: '11 mg' }, { group: '성인 여성', amount: '8 mg' }, { group: '아이들 4-8세', amount: '5 mg' }, { group: '아이들 9-13세', amount: '8 mg' }], benefits: '면역 기능, 세포 분열', overdose: '구토, 설사, 신경 독성', overdoseExample: '아연을 과도하게 섭취하면 면역 기능에 부정적인 영향을 줄 수 있습니다.', deficiency: '면역 기능 저하, 상처 치유 지연, 성장 장애', deficiencyExample: '아연 결핍은 면역 기능 저하와 상처 치유 능력 저하를 초래할 수 있습니다.' }
  ];

  vitamins.forEach(vitamin => {
    const button = document.createElement('button');
    button.textContent = vitamin.name;
    button.className = 'vitamin-button';
    button.addEventListener('click', () => showVitaminDetails(vitamin));
    dataContainer.appendChild(button);
  });

  const overdoseButton = document.createElement('button');
  overdoseButton.textContent = '과다 섭취 시 부작용';
  overdoseButton.className = 'side-effect-button';
  overdoseButton.addEventListener('click', showOverdoseDetails);
  dataContainer.appendChild(overdoseButton);

  const deficiencyButton = document.createElement('button');
  deficiencyButton.textContent = '결핍 시 부작용';
  deficiencyButton.className = 'side-effect-button';
  deficiencyButton.addEventListener('click', showDeficiencyDetails);
  dataContainer.appendChild(deficiencyButton);

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  function showVitaminDetails(vitamin) {
    vitaminDetails.innerHTML = `<h2>${vitamin.name}</h2>`;
    vitamin.categories.forEach(category => {
      vitaminDetails.innerHTML += `<p><strong>${category.group}:</strong> ${category.amount}</p>`;
    });
    vitaminDetails.innerHTML += `<p><strong>효능:</strong> ${vitamin.benefits}</p>`;
    modal.style.display = 'block';
  }

  function showOverdoseDetails() {
    vitaminDetails.innerHTML = '<h2>과다 섭취 시 부작용</h2>';
    vitamins.forEach(vitamin => {
      if (vitamin.overdose && vitamin.overdoseExample) {
        vitaminDetails.innerHTML += `<h3>${vitamin.name}</h3>`;
        vitaminDetails.innerHTML += `<p><strong>과다 섭취:</strong> ${vitamin.overdose}</p>`;
        vitaminDetails.innerHTML += `<p><strong>예시:</strong> ${vitamin.overdoseExample}</p>`;
      }
    });
    modal.style.display = 'block';
  }

  function showDeficiencyDetails() {
    vitaminDetails.innerHTML = '<h2>결핍 시 부작용</h2>';
    vitamins.forEach(vitamin => {
      if (vitamin.deficiency && vitamin.deficiencyExample) {
        vitaminDetails.innerHTML += `<h3>${vitamin.name}</h3>`;
        vitaminDetails.innerHTML += `<p><strong>결핍:</strong> ${vitamin.deficiency}</p>`;
        vitaminDetails.innerHTML += `<p><strong>예시:</strong> ${vitamin.deficiencyExample}</p>`;
      }
    });
    modal.style.display = 'block';
  }

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
