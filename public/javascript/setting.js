document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('profile');
  const profileModal = document.getElementById('profileModal');
  const closeProfileModal = document.querySelector('.closeProfileModal');
  const profileOptions = document.querySelectorAll('.profileOption');
  const alertModal = document.getElementById('alertModal');
  const closeAlertModal = document.querySelector('.closeAlertModal');
  const alertMessage = document.getElementById('alertMessage');
  let selectedProfile = '';

  profileButton.addEventListener('click', () => {
    profileModal.style.display = 'block';
  });

  closeProfileModal.addEventListener('click', () => {
    profileModal.style.display = 'none';
  });

  closeAlertModal.addEventListener('click', () => {
    alertModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === profileModal) {
      profileModal.style.display = 'none';
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

  function showAlert(message) {
    alertMessage.textContent = message;
    alertModal.style.display = 'block';
  }
});
