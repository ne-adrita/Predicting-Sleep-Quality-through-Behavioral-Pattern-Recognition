function renderProfileIcon(showBadge = false, currentPage = '') {
    // Remove existing icon if any
    const existingIcon = document.querySelector('.profile-icon-container');
    if (existingIcon) {
        existingIcon.remove();
    }

    // Create container
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-icon-container';
    
    // Create clickable icon with page name
    const profileIcon = document.createElement('div');
    profileIcon.className = 'profile-icon';
    profileIcon.innerHTML = `
        <div class="current-page">${currentPage}</div>
        <div class="profile-avatar">
            <img src="https://i.pinimg.com/736x/03/05/79/030579b9189f00609a42e93a0fd1bf6e.jpg" alt="Profile">
            ${showBadge ? '<span class="notification-badge"></span>' : ''}
        </div>
    `;
    
    // Create dropdown menu with all navigation options
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'profile-dropdown';
    dropdownMenu.style.display = 'none';
    dropdownMenu.innerHTML = `
        <div class="dropdown-header">
            <span>Sections</span>
        </div>
        <div class="dropdown-item" onclick="renderCaffeineCheck()">
            <i class="fas fa-coffee"></i> Daily Check-In
        </div>
        <div class="dropdown-item" onclick="renderMoodStressCheck()">
            <i class="fas fa-smile"></i> Mood & Stress
        </div>
        <div class="dropdown-item" onclick="renderActivityForm()">
            <i class="fas fa-running"></i> Activities
        </div>
        <div class="dropdown-item" onclick="renderSleepSession()">
            <i class="fas fa-moon"></i> Sleep Session
        </div>
        </div>
        <div class="dropdown-item" onclick="renderPattern()">
            <i class="fas fa-chart-pie"></i> Behavioral Pattern
        </div>
        <div class="dropdown-item" onclick="renderScore()">
            <i class="fas fa-chart-pie"></i> Sleep Quality
        </div>
        <div class="dropdown-item" onclick="renderRecommendation()">
            <i class="fas fa-chart-pie"></i> Recommendation
        </div>
        <div class="dropdown-header">
             <span>Settings</span>
        </div>
       
        <div class="dropdown-item"></div>
        <div class="dropdown-item" onclick="renderUserProfile()">
            <i class="fas fa-user"></i> My Profile
        </div>
        <div class="dropdown-item" onclick="renderLogout()">
            <i class="fas fa-sign-out-alt"></i> Logout
        </div>
    `;

    // Toggle dropdown
    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close when clicking outside
    document.addEventListener('click', function() {
        dropdownMenu.style.display = 'none';
    });

    profileContainer.appendChild(profileIcon);
    profileContainer.appendChild(dropdownMenu);
    document.body.appendChild(profileContainer);
}

function renderUserProfile() {
    // Clear notifications
    localStorage.setItem('lastProfileView', Date.now());
    renderProfileIcon(false); // Update icon without badge

    // Get user data from localStorage or use defaults
    const username = localStorage.getItem('username') || 'User';
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    const moodChecks = JSON.parse(localStorage.getItem('moodChecks')) || [];
    const sleepSessions = JSON.parse(localStorage.getItem('sleepSessions')) || [];

    // Generate mock data for demonstration
    const userData = {
        name: username,
        age: localStorage.getItem('age') || 'Not specified',
        gender: localStorage.getItem('gender') || 'Not specified',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    // If we don't have enough data, generate some for demonstration
    if (activities.length < 4) {
        activities.push(
            { type: "Running", duration: 30, date: new Date(Date.now() - 3 * 86400000).toISOString() },
            { type: "Swimming", duration: 45, date: new Date(Date.now() - 2 * 86400000).toISOString() },
            { type: "Walking", duration: 60, date: new Date(Date.now() - 86400000).toISOString() }
        );
    }

    if (moodChecks.length < 4) {
        moodChecks.push(
            { mood: 8, stress: 4, productivity: 7, date: new Date(Date.now() - 3 * 86400000).toISOString() },
            { mood: 6, stress: 5, productivity: 6, date: new Date(Date.now() - 2 * 86400000).toISOString() },
            { mood: 7, stress: 3, productivity: 8, date: new Date(Date.now() - 86400000).toISOString() }
        );
    }

    if (sleepSessions.length < 4) {
        sleepSessions.push(
            { duration: 7.5, date: new Date(Date.now() - 3 * 86400000).toISOString(), quality: 85 },
            { duration: 6.5, date: new Date(Date.now() - 2 * 86400000).toISOString(), quality: 72 },
            { duration: 8.0, date: new Date(Date.now() - 86400000).toISOString(), quality: 90 }
        );
    }

    renderPage(`
        <style>
            /* Add profile-specific styles */
            .profile-container {
                max-width: 800px;
                margin: 20px auto;
                background: white;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            
            .profile-header {
                position: relative;
                background: linear-gradient(120deg, #fbc2eb, #a6c1ee);
                padding: 20px;
                text-align: center;
                color: white;
            }
            
            .profile-info {
                position: relative;
                padding-top: 60px;
            }
            
            .profile-pic {
                position: absolute;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: linear-gradient(to right, #f953c6, #b91d73);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                font-weight: bold;
                color: white;
                border: 4px solid white;
            }
            
            .profile-nav {
                display: flex;
                border-bottom: 1px solid #eee;
            }
            
            .nav-btn {
                flex: 1;
                padding: 15px;
                background: none;
                border: none;
                cursor: pointer;
                font-weight: bold;
                color: #666;
                transition: all 0.3s;
            }
            
            .nav-btn.active {
                color: #b91d73;
                border-bottom: 3px solid #b91d73;
            }
            
            .profile-section {
                padding: 20px;
            }
            
            .hidden {
                display: none;
            }
            
            .post-card, .activity-item, .sleep-card, .mood-card {
                background: #f9f9f9;
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 15px;
            }
            
            .post-header, .activity-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .post-pic, .activity-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(to right, #f953c6, #b91d73);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                margin-right: 15px;
            }
            
            .activity-icon {
                background: #a6c1ee;
            }
            
            .activity-icon.running { background: #4CAF50; }
            .activity-icon.swimming { background: #2196F3; }
            .activity-icon.walking { background: #FFC107; }
            .activity-icon.gym { background: #F44336; }
            
            .sleep-quality {
                margin-top: 10px;
            }
            
            .sleep-score {
                font-weight: bold;
            }
            
            .sleep-score.excellent { color: #4CAF50; }
            .sleep-score.good { color: #8BC34A; }
            .sleep-score.fair { color: #FFC107; }
            .sleep-score.moderate { color: #FF9800; }
            .sleep-score.poor { color: #F44336; }
            
            .sleep-meter {
                height: 10px;
                background: #eee;
                border-radius: 5px;
                margin: 10px 0;
                overflow: hidden;
            }
            
            .meter-fill {
                height: 100%;
                background: linear-gradient(to right, #f953c6, #b91d73);
            }
            
            .mood-metrics {
                margin-top: 10px;
            }
            
            .metric {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .metric span:first-child {
                width: 100px;
            }
            
            .mood-bar {
                flex: 1;
                height: 10px;
                background: #eee;
                border-radius: 5px;
                margin: 0 10px;
                overflow: hidden;
                position: relative;
            }
            
            .mood-bar:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                border-radius: 5px;
            }
            
            .mood-1:after { width: 10%; background: #F44336; }
            .mood-2:after { width: 20%; background: #F44336; }
            .mood-3:after { width: 30%; background: #FF9800; }
            .mood-4:after { width: 40%; background: #FF9800; }
            .mood-5:after { width: 50%; background: #FFC107; }
            .mood-6:after { width: 60%; background: #8BC34A; }
            .mood-7:after { width: 70%; background: #8BC34A; }
            .mood-8:after { width: 80%; background: #4CAF50; }
            .mood-9:after { width: 90%; background: #4CAF50; }
            .mood-10:after { width: 100%; background: #4CAF50; }
            
            .stress-1:after { width: 10%; background: #4CAF50; }
            .stress-2:after { width: 20%; background: #4CAF50; }
            .stress-3:after { width: 30%; background: #8BC34A; }
            .stress-4:after { width: 40%; background: #FFC107; }
            .stress-5:after { width: 50%; background: #FF9800; }
            .stress-6:after { width: 60%; background: #FF9800; }
            .stress-7:after { width: 70%; background: #F44336; }
            .stress-8:after { width: 80%; background: #F44336; }
            .stress-9:after { width: 90%; background: #F44336; }
            .stress-10:after { width: 100%; background: #F44336; }
            
            .productivity-1:after { width: 10%; background: #F44336; }
            .productivity-2:after { width: 20%; background: #F44336; }
            .productivity-3:after { width: 30%; background: #FF9800; }
            .productivity-4:after { width: 40%; background: #FF9800; }
            .productivity-5:after { width: 50%; background: #FFC107; }
            .productivity-6:after { width: 60%; background: #8BC34A; }
            .productivity-7:after { width: 70%; background: #8BC34A; }
            .productivity-8:after { width: 80%; background: #4CAF50; }
            .productivity-9:after { width: 90%; background: #4CAF50; }
            .productivity-10:after { width: 100%; background: #4CAF50; }
            
            .logout-btn, .back-to-app-btn {
                background: linear-gradient(to right, #f953c6, #b91d73);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                margin-top: 10px;
                cursor: pointer;
                font-weight: bold;
                margin-right: 10px;
            }
            
            .button-container {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
        </style>
        
        <div class="profile-container">
            <!-- Profile Header -->
            <div class="profile-header">
                <div class="profile-info">
                    <div class="profile-pic">${userData.name.split(' ').map(n => n[0]).join('')}</div>
                    <h1>${userData.name}</h1>
                    <p>Age: ${userData.age} | Gender: ${userData.gender}</p>
                    <p>Member since ${userData.joinDate}</p>
                    <div class="button-container">
                        <button class="back-to-app-btn" onclick="renderCaffeineCheck()">Back to App</button>
                        <button class="logout-btn" onclick="renderLogout()">Log Out</button>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <div class="profile-nav">
                <button class="nav-btn active" onclick="showProfileSection('posts')">Posts</button>
                <button class="nav-btn" onclick="showProfileSection('activities')">Activities</button>
                <button class="nav-btn" onclick="showProfileSection('sleep')">Sleep</button>
                <button class="nav-btn" onclick="showProfileSection('mood')">Mood</button>
            </div>

            <!-- Main Content -->
            <div class="profile-content">
                <!-- Posts Section (Default) -->
                <div id="posts-section" class="profile-section">
                    ${sleepSessions.slice(0, 5).map(session => `
                        <div class="post-card">
                            <div class="post-header">
                                <div class="post-pic">${userData.name.split(' ').map(n => n[0]).join('')}</div>
                                <div>
                                    <h3>${userData.name}</h3>
                                    <p>${new Date(session.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>Last night's sleep: ${session.duration} hours</p>
                                <div class="sleep-quality">
                                    <span>Sleep Quality: </span>
                                    <span class="sleep-score ${getQualityClass(session.quality || 75)}">${session.quality || 75}%</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Activities Section -->
                <div id="activities-section" class="profile-section hidden">
                    <h2>Activity History</h2>
                    <div class="activity-list">
                        ${activities.slice(0, 10).map(activity => `
                            <div class="activity-item">
                                <div class="activity-icon ${activity.type.toLowerCase()}">${activity.type[0]}</div>
                                <div class="activity-details">
                                    <h3>${activity.type}</h3>
                                    <p>Duration: ${activity.duration} minutes</p>
                                    <p class="activity-date">${new Date(activity.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Sleep Section -->
                <div id="sleep-section" class="profile-section hidden">
                    <h2>Sleep History</h2>
                    <div class="sleep-stats">
                        ${sleepSessions.slice(0, 10).map(session => `
                            <div class="sleep-card">
                                <h3>${new Date(session.date).toLocaleDateString()}</h3>
                                <p>Duration: ${session.duration} hours</p>
                                <div class="sleep-meter">
                                    <div class="meter-fill" style="width: ${session.quality || 75}%"></div>
                                </div>
                                <p>Quality: ${getQualityText(session.quality || 75)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Mood Section -->
                <div id="mood-section" class="profile-section hidden">
                    <h2>Mood History</h2>
                    <div class="mood-history">
                        ${moodChecks.slice(0, 10).map(check => `
                            <div class="mood-card">
                                <h3>${new Date(check.date).toLocaleDateString()}</h3>
                                <div class="mood-metrics">
                                    <div class="metric">
                                        <span>Mood</span>
                                        <div class="mood-bar mood-${check.mood}"></div>
                                        <span>${check.mood}/10</span>
                                    </div>
                                    <div class="metric">
                                        <span>Stress</span>
                                        <div class="mood-bar stress-${check.stress}"></div>
                                        <span>${check.stress}/10</span>
                                    </div>
                                    <div class="metric">
                                        <span>Productivity</span>
                                        <div class="mood-bar productivity-${check.productivity}"></div>
                                        <span>${check.productivity}/10</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `);
}

function showProfileSection(section) {
    // Hide all sections
    document.querySelectorAll('.profile-section').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.remove('hidden');
    
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function getQualityClass(score) {
    return score >= 85 ? 'excellent' :
           score >= 75 ? 'good' :
           score >= 60 ? 'fair' :
           score >= 40 ? 'moderate' : 'poor';
}

function getQualityText(score) {
    return score >= 85 ? 'Excellent' :
           score >= 75 ? 'Good' :
           score >= 60 ? 'Fair' :
           score >= 40 ? 'Moderate' : 'Poor';
}


function notifyNewActivity() {
    renderProfileIcon(true); // Show with badge
}