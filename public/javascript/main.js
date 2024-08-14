document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addButton');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const searchInput = document.getElementById('searchInput');
  const vitaminGrid = document.getElementById('vitaminGrid');
  const inputModal = document.getElementById('inputModal');
  const closeInputModal = document.querySelector('.closeInputModal');
  const vitaminDetails = document.getElementById('vitaminDetails');
  const intakeAmount = document.getElementById('intakeAmount');
  const unitSelect = document.getElementById('unitSelect');
  const unitLabel = document.getElementById('unitLabel');
  const registerButton = document.getElementById('registerButton');
  const tonicContainer = document.getElementById('tonic');

  let selectedVitaminDetails = [];

  // Load tonics from localStorage on page load
  loadTonicsFromLocalStorage();

  addButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    loadVitamins();
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  closeInputModal.addEventListener('click', () => {
    inputModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    } else if (event.target === inputModal) {
      inputModal.style.display = 'none';
    }
  });

  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const vitaminItems = document.querySelectorAll('.vitamin-item');
    vitaminItems.forEach((item) => {
      const name = item.textContent.toLowerCase();
      if (name.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  registerButton.addEventListener('click', () => {
    const intakeValue = intakeAmount.value.trim();
    const selectedUnit = unitSelect.value;
    const selectedVitamin = vitaminDetails.querySelector('h2').textContent;
    const selectedProfile = localStorage.getItem('selectedProfile');

    if (intakeValue) {
      const tonicData = {
        name: selectedVitamin,
        details: selectedVitaminDetails,
        intake: intakeValue,
        profile: selectedProfile,
        unit: selectedUnit,
      };
      if (!isDuplicateTonic(tonicData)) {
        addTonicItem(tonicData);
        saveTonicToLocalStorage(tonicData);
        inputModal.style.display = 'none';
      } else {
        alert('이미 등록된 영양제입니다.');
      }
    } else {
      alert('양을 입력하세요.');
    }
  });

  function loadVitamins() {
    fetch('/api/tonics')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'success') {
          vitaminGrid.innerHTML = '';
          const namesAdded = new Set();
          data.data.forEach((vitamin) => {
            if (!namesAdded.has(vitamin.vitamin)) {
              const vitaminElement = document.createElement('div');
              vitaminElement.className = 'vitamin-item';
              vitaminElement.textContent = vitamin.vitamin;
              vitaminElement.addEventListener('click', () => showVitaminDetails(vitamin.vitamin, data.data));
              vitaminGrid.appendChild(vitaminElement);
              namesAdded.add(vitamin.vitamin);
            }
          });
        }
      })
      .catch((error) => console.error('Error:', error));
  }

  function showVitaminDetails(vitamin, data) {
    const selectedProfile = localStorage.getItem('selectedProfile');
    selectedVitaminDetails = data.filter((item) => item.vitamin === vitamin);

    let filteredData;
    if (selectedProfile === '성인 남성' || selectedProfile === '성인 여성') {
      filteredData = selectedVitaminDetails.filter((item) => item.category === selectedProfile || item.category === '성인');
    } else {
      filteredData = selectedVitaminDetails.filter((item) => item.category === selectedProfile);
    }

    vitaminDetails.innerHTML = `<h2>${vitamin}</h2>`;
    filteredData.forEach((item) => {
      vitaminDetails.innerHTML += `<p>${item.category}: ${item.recommend}</p>`;
    });

    if (vitamin === '비타민D') {
      unitLabel.style.display = 'block';
      unitSelect.style.display = 'block';
    } else {
      unitLabel.style.display = 'none';
      unitSelect.style.display = 'none';
    }

    intakeAmount.value = ''; // 입력창 초기화
    inputModal.style.display = 'flex';
  }

  function addTonicItem(tonicData) {
    const { name, details, intake, profile, unit } = tonicData;
    const tonicItem = document.createElement('div');
    tonicItem.className = 'tonic-item';
    tonicItem.style.position = 'relative';

    const title = document.createElement('div');
    title.className = 'tonic-title';
    title.textContent = name;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'tonic-info';
    const profileData = details.find((item) => item.category === profile) || details.find((item) => item.category === '성인');
    infoDiv.textContent = `${profileData.category}: ${profileData.recommend}`;

    const intakeDiv = document.createElement('div');
    intakeDiv.className = 'tonic-info';
    intakeDiv.textContent = `내가 먹고 있는 양: ${intake} ${unit}`;

    const barDiv = document.createElement('div');
    barDiv.className = 'tonic-bar';

    let recommended;
    if (name === '비타민D') {
      if (unit === 'IU') {
        recommended = 600;
      } else {
        recommended = 15;
      }
    } else {
      const recommendValue = profileData.recommend.split(' ')[0];
      const recommendUnit = profileData.recommend.split(' ')[1];
      recommended = parseFloat(recommendValue);

      intakeDiv.textContent = `내가 먹고 있는 양: ${intake} ${recommendUnit}`;
    }

    const intakeValue = parseFloat(intake);
    const percentage = Math.min((intakeValue / recommended) * 100, 100);

    const barInnerDiv = document.createElement('div');
    barInnerDiv.className = 'tonic-bar-inner';
    barInnerDiv.style.width = `${percentage}%`;

    barDiv.appendChild(barInnerDiv);

    const closeButton = document.createElement('button');
    closeButton.className = 'close-tonic';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
      tonicItem.remove();
      removeTonicFromLocalStorage(name);
    });

    tonicItem.appendChild(closeButton);
    tonicItem.appendChild(title);
    tonicItem.appendChild(infoDiv);
    tonicItem.appendChild(intakeDiv);
    tonicItem.appendChild(barDiv);

    tonicContainer.appendChild(tonicItem);
  }

  function saveTonicToLocalStorage(tonicData) {
    let tonics = JSON.parse(localStorage.getItem('tonics')) || [];
    tonics.push(tonicData);
    localStorage.setItem('tonics', JSON.stringify(tonics));
  }

  function loadTonicsFromLocalStorage() {
    const tonics = JSON.parse(localStorage.getItem('tonics')) || [];
    tonics.forEach((tonicData) => addTonicItem(tonicData));
  }

  function removeTonicFromLocalStorage(name) {
    let tonics = JSON.parse(localStorage.getItem('tonics')) || [];
    tonics = tonics.filter((tonic) => tonic.name !== name);
    localStorage.setItem('tonics', JSON.stringify(tonics));
  }

  function isDuplicateTonic(newTonic) {
    let tonics = JSON.parse(localStorage.getItem('tonics')) || [];
    return tonics.some((tonic) => tonic.name === newTonic.name);
  }

  function changeLanguage(language) {
    const translations = {
      ko: {
        title: '나의 영양 분석',
        addButton: '영양제 추가',
        management: '영양제 관리',
        information: '영양분 정보',
        shopping: '영양제 쇼핑',
        setting: '설정',
      },
      en: {
        title: 'My Nutrient Analysis',
        addButton: 'Add Supplement',
        management: 'Supplement Management',
        information: 'Nutrient Information',
        shopping: 'Supplement Shopping',
        setting: 'Settings',
      },
      ja: {
        title: '私の栄養分析',
        addButton: 'サプリメントを追加',
        management: 'サプリメント管理',
        information: '栄養情報',
        shopping: 'サプリメントショッピング',
        setting: '設定',
      },
      zh: {
        title: '我的营养分析',
        addButton: '添加补品',
        management: '补品管理',
        information: '营养信息',
        shopping: '补品购物',
        setting: '设置',
      },
    };

    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('addButton').textContent = translations[language].addButton;
    document.getElementById('Management').querySelector('a').textContent = translations[language].management;
    document.getElementById('information').querySelector('a').textContent = translations[language].information;
    document.getElementById('shopping').querySelector('a').textContent = translations[language].shopping;
    document.getElementById('setting').querySelector('a').textContent = translations[language].setting;
  }

  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  }
});
