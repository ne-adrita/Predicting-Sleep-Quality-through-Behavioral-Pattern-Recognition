// scripts/profile.js
let hasUnreadNotifications = false;

function renderProfileIcon(showBadge = false) {
  const existingIcon = document.querySelector('.profile-icon');
  if (existingIcon) {
    existingIcon.remove();
  }

  const profileIcon = document.createElement('div');
  profileIcon.className = 'profile-icon';
  profileIcon.innerHTML = `
    <img src="https://i.pinimg.com/736x/03/05/79/030579b9189f00609a42e93a0fd1bf6e.jpg" alt="Profile">
    ${showBadge ? '<span class="notification-badge"></span>' : ''}
  `;
  profileIcon.onclick = renderUserProfile;
  document.body.appendChild(profileIcon);
}

function checkForNewNotifications() {

  const lastViewed = localStorage.getItem('lastProfileView') || 0;
  const hasNewData = ['moodChecks', 'activities', 'sleepSessions'].some(key => {
    const items = JSON.parse(localStorage.getItem(key)) || [];
    return items.some(item => new Date(item.date || item.timestamp).getTime() > lastViewed);
  });
  
  hasUnreadNotifications = hasNewData;
  renderProfileIcon(hasUnreadNotifications);
}

function renderUserProfile() {
  // Mark notifications as read
  localStorage.setItem('lastProfileView', Date.now());
  hasUnreadNotifications = false;
  renderProfileIcon(false);

  // Get user data from localStorage or use mock data
  const userData = {
    name: localStorage.getItem('username') || "User",
    age: localStorage.getItem('age') || "",
    gender: localStorage.getItem('gender') || "",
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };

  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  const moodChecks = JSON.parse(localStorage.getItem('moodChecks')) || [];
  const sleepSessions = JSON.parse(localStorage.getItem('sleepSessions')) || [];
}


function notifyNewActivity() {
  hasUnreadNotifications = true;
  renderProfileIcon(true);
}