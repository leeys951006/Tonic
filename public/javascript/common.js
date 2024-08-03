document.addEventListener('DOMContentLoaded', () => {
  function changeLanguage(language) {
    const translations = {
      ko: {
        title: '설정',
        profile: '프로필 설정',
        language: '언어 설정',
        management: '영양제 관리',
        information: '영양분 정보',
        shopping: '영양제 쇼핑',
        setting: '설정',
        addButton: '영양제 추가',
        searchPlaceholder: '영양제 검색',
        registerButton: '등록'
      },
      en: {
        title: 'Settings',
        profile: 'Profile Settings',
        language: 'Language Settings',
        management: 'Supplement Management',
        information: 'Nutrient Information',
        shopping: 'Supplement Shopping',
        setting: 'Settings',
        addButton: 'Add Supplement',
        searchPlaceholder: 'Search Supplement',
        registerButton: 'Register'
      },
      ja: {
        title: '設定',
        profile: 'プロフィール設定',
        language: '言語設定',
        management: 'サプリメント管理',
        information: '栄養情報',
        shopping: 'サプリメントショッピング',
        setting: '設定',
        addButton: 'サプリメント追加',
        searchPlaceholder: 'サプリメント検索',
        registerButton: '登録'
      },
      zh: {
        title: '设置',
        profile: '个人资料设置',
        language: '语言设置',
        management: '补品管理',
        information: '营养信息',
        shopping: '补品购物',
        setting: '设置',
        addButton: '添加补品',
        searchPlaceholder: '搜索补品',
        registerButton: '注册'
      }
    };

    if (document.getElementById('title')) {
      document.getElementById('title').textContent = translations[language].title;
    }
    if (document.getElementById('profile')) {
      document.getElementById('profile').textContent = translations[language].profile;
    }
    if (document.getElementById('Language')) {
      document.getElementById('Language').textContent = translations[language].language;
    }
    if (document.getElementById('Management')) {
      document.getElementById('Management').querySelector('a').textContent = translations[language].management;
    }
    if (document.getElementById('information')) {
      document.getElementById('information').querySelector('a').textContent = translations[language].information;
    }
    if (document.getElementById('shopping')) {
      document.getElementById('shopping').querySelector('a').textContent = translations[language].shopping;
    }
    if (document.getElementById('setting')) {
      document.getElementById('setting').querySelector('a').textContent = translations[language].setting;
    }
    if (document.getElementById('addButton')) {
      document.getElementById('addButton').textContent = translations[language].addButton;
    }
    if (document.getElementById('searchInput')) {
      document.getElementById('searchInput').placeholder = translations[language].searchPlaceholder;
    }
    if (document.getElementById('registerButton')) {
      document.getElementById('registerButton').textContent = translations[language].registerButton;
    }
  }

  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  }
});
