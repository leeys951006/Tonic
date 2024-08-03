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
    vitaminItems.forEach(item => {
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
        unit: selectedUnit
      };
      addTonicItem(tonicData);
      saveTonicToLocalStorage(tonicData);
      inputModal.style.display = 'none';
    } else {
      alert('양을 입력하세요.');
    }
  });

  function loadVitamins() {
    fetch('/api/tonics')
      .then(response => response.json())
      .then(data => {
        if (data.message === 'success') {
          vitaminGrid.innerHTML = '';
          const namesAdded = new Set();
          data.data.forEach(vitamin => {
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
      .catch(error => console.error('Error:', error));
  }

  function showVitaminDetails(vitamin, data) {
    const selectedProfile = localStorage.getItem('selectedProfile');
    selectedVitaminDetails = data.filter(item => item.vitamin === vitamin);

    let filteredData;
    if (selectedProfile === '성인 남성' || selectedProfile === '성인 여성') {
      filteredData = selectedVitaminDetails.filter(item => item.category === selectedProfile || item.category === '성인');
    } else {
      filteredData = selectedVitaminDetails.filter(item => item.category === selectedProfile);
    }

    vitaminDetails.innerHTML = `<h2>${vitamin}</h2>`;
    filteredData.forEach(item => {
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

    const title = document.createElement('div');
    title.className = 'tonic-title';
    title.textContent = name;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'tonic-info';
    const profileData = details.find(item => item.category === profile) || details.find(item => item.category === '성인');
    infoDiv.textContent = `${profileData.category}: ${profileData.recommend}`;

    const intakeDiv = document.createElement('div');
    intakeDiv.className = 'tonic-info';
    intakeDiv.textContent = `내가 먹고 있는 양: ${intake}${unit}`;

    const barDiv = document.createElement('div');
    barDiv.className = 'tonic-bar';

    let recommended;
    if (name === '비타민D') {
      if (unit === 'IU') {
        recommended = 600; // 비타민 D의 IU 기준 값을 설정합니다.
      } else {
        recommended = 15; // 비타민 D의 µg 기준 값을 설정합니다.
      }
    } else {
      const recommendValue = profileData.recommend.split(' ')[0];
      const recommendUnit = profileData.recommend.split(' ')[1];
      recommended = parseFloat(recommendValue);

      // 비타민 및 미네랄의 단위를 데이터베이스의 값과 일치시킵니다.
      intakeDiv.textContent = `내가 먹고 있는 양: ${intake} ${recommendUnit}`;
    }

    const intakeValue = parseFloat(intake);
    const percentage = Math.min((intakeValue / recommended) * 100, 100);

    const barInnerDiv = document.createElement('div');
    barInnerDiv.className = 'tonic-bar-inner';
    barInnerDiv.style.width = `${percentage}%`;

    barDiv.appendChild(barInnerDiv);

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
    tonics.forEach(tonicData => addTonicItem(tonicData));
  }
});
