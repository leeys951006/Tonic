document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('profile');
  const languageButton = document.getElementById('Language');
  const profileModal = document.getElementById('profileModal');
  const languageModal = document.getElementById('languageModal');
  const closeProfileModal = document.querySelector('.closeProfileModal');
  const closeLanguageModal = document.querySelector('.closeLanguageModal');
  const profileOptions = document.querySelectorAll('.profileOption');
  const languageOptions = document.querySelectorAll('.languageOption');
  const alertModal = document.getElementById('alertModal');
  const closeAlertModal = document.querySelector('.closeAlertModal');
  const alertMessage = document.getElementById('alertMessage');
  let selectedProfile = '';

  profileButton.addEventListener('click', () => {
    profileModal.style.display = 'block';
  });

  languageButton.addEventListener('click', () => {
    languageModal.style.display = 'block';
  });

  closeProfileModal.addEventListener('click', () => {
    profileModal.style.display = 'none';
  });

  closeLanguageModal.addEventListener('click', () => {
    languageModal.style.display = 'none';
  });

  closeAlertModal.addEventListener('click', () => {
    alertModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === profileModal) {
      profileModal.style.display = 'none';
    } else if (event.target === languageModal) {
      languageModal.style.display = 'none';
    } else if (event.target === alertModal) {
      alertModal.style.display = 'none';
    }
  });

  profileOptions.forEach(option => {
    option.addEventListener('click', (event) => {
      selectedProfile = event.target.getAttribute('data-profile');
      localStorage.setItem('selectedProfile', selectedProfile);
      profileModal.style.display = 'none';
      showAlert(`선택된 프로필: ${selectedProfile}`);
    });
  });

  languageOptions.forEach(option => {
    option.addEventListener('click', (event) => {
      const selectedLanguage = event.target.getAttribute('data-language');
      localStorage.setItem('selectedLanguage', selectedLanguage);
      languageModal.style.display = 'none';
      showAlert(`선택된 언어: ${selectedLanguage}`);
      changeLanguage(selectedLanguage);
    });
  });

  function showAlert(message) {
    alertMessage.textContent = message;
    alertModal.style.display = 'block';
  }

  function changeLanguage(language) {
    // 여기에 각 언어별 번역 데이터를 설정합니다.
    const translations = {
      ko: {
        title: '설정',
        profile: '프로필 설정',
        language: '언어 설정',
        management: '영양제 관리',
        information: '영양분 정보',
        shopping: '영양제 쇼핑',
        setting: '설정'
      },
      en: {
        title: 'Settings',
        profile: 'Profile Settings',
        language: 'Language Settings',
        management: 'Supplement Management',
        information: 'Nutrient Information',
        shopping: 'Supplement Shopping',
        setting: 'Settings'
      },
      ja: {
        title: '設定',
        profile: 'プロフィール設定',
        language: '言語設定',
        management: 'サプリメント管理',
        information: '栄養情報',
        shopping: 'サプリメントショッピング',
        setting: '設定'
      },
      zh: {
        title: '设置',
        profile: '个人资料设置',
        language: '语言设置',
        management: '补品管理',
        information: '营养信息',
        shopping: '补品购物',
        setting: '设置'
      }
    };

    // 페이지 내 텍스트 요소를 선택된 언어로 변경합니다.
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('profile').textContent = translations[language].profile;
    document.getElementById('Language').textContent = translations[language].language;
    document.getElementById('Management').querySelector('a').textContent = translations[language].management;
    document.getElementById('information').querySelector('a').textContent = translations[language].information;
    document.getElementById('shopping').querySelector('a').textContent = translations[language].shopping;
    document.getElementById('setting').querySelector('a').textContent = translations[language].setting;
  }

  // 페이지 로드 시 저장된 언어 설정이 있다면 해당 언어로 변경합니다.
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  }
});
