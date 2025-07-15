// scripts/profile.js
function renderProfileIcon(showBadge = false) {
    // Remove existing icon if any
    const existingIcon = document.querySelector('.profile-icon');
    if (existingIcon) {
        existingIcon.remove();
    }

    // Create new icon
    const profileIcon = document.createElement('div');
    profileIcon.className = 'profile-icon';
    profileIcon.innerHTML = `
        <img src="https://via.placeholder.com/30" alt="Profile">
        ${showBadge ? '<span class="notification-badge"></span>' : ''}
    `;
    
    // Add click handler
    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        renderUserProfile();
    });

    document.body.appendChild(profileIcon);
}

function renderUserProfile() {
    // Clear notifications
    localStorage.setItem('lastProfileView', Date.now());
    renderProfileIcon(false); // Update icon without badge

    // Get user data
    const username = localStorage.getItem('username') || 'User';
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    const moodChecks = JSON.parse(localStorage.getItem('moodChecks')) || [];
    const sleepSessions = JSON.parse(localStorage.getItem('sleepSessions')) || [];

    // Render profile page
    renderPage(`
        <div class="profile-container">
            <h2>${username}'s Profile</h2>
            
            <div class="profile-section">
                <h3>Recent Activities</h3>
                ${activities.slice(-3).reverse().map(activity => `
                    <div class="activity-item">
                        <p>${activity.type} - ${activity.duration} mins</p>
                        <small>${new Date(activity.date).toLocaleDateString()}</small>
                    </div>
                `).join('') || '<p>No activities yet</p>'}
            </div>

            <div class="profile-section">
                <h3>Recent Mood Checks</h3>
                ${moodChecks.slice(-3).reverse().map(mood => `
                    <div class="mood-item">
                        <p>Mood: ${mood.mood}/10, Stress: ${mood.stress}/10</p>
                        <small>${new Date(mood.date).toLocaleDateString()}</small>
                    </div>
                `).join('') || '<p>No mood checks yet</p>'}
            </div>

            <div class="profile-section">
                <h3>Recent Sleep Sessions</h3>
                ${sleepSessions.slice(-3).reverse().map(sleep => `
                    <div class="sleep-item">
                        <p>${sleep.duration} hours on ${sleep.date || new Date(sleep.timestamp).toLocaleDateString()}</p>
                    </div>
                `).join('') || '<p>No sleep sessions yet</p>'}
            </div>

            <button onclick="renderActivityForm()">Back to App</button>
        </div>
    `);
}

// Call this when new data is added
function notifyNewActivity() {
    renderProfileIcon(true); // Show with badge
}