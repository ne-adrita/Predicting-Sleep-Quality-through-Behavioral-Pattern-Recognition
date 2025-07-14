function renderCaffeineCheck() {
    renderPage(`
      <div class="card" style="padding: 20px;">
        <h2>Caffeine Intake</h2>
        
        <!-- Caffeine Level -->
        <h3 style="margin-top: 30px;">Caffeine Level</h3>
        <div id="stressLabel" style="font-size: 24px; margin: 10px 0; font-weight: bold;">
          <span id="stressNumber">5</span>/10 - <span id="stressText">Moderate</span>
        </div>
        <input type="range" min="1" max="10" value="5" class="slider" id="stressSlider" oninput="updateStressLabel()">
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 20px;">
          <span style="font-size: 14px; color: #666;">Very Low</span>
          <span style="font-size: 14px; color: #666;">Very High</span>
        </div>
    
        <button onclick="renderMoodStressCheck()">Next</button>
      </div>
    `);
}

function updateCaffeineLabel() {
    const slider = document.getElementById("caffeineSlider");
    const numberElement = document.getElementById("caffeineNumber");
    numberElement.textContent = slider.value;
}

function renderMoodStressCheck() {
    renderPage(`
      <div class="card" style="padding: 20px;">
        <div style="text-align: left; margin-bottom: 20px;">
          <span style="cursor:pointer; color:#007AFF;" onclick="renderCaffeineCheck()">← Back</span>
        </div>
        
        <h2>Mood & Stress Check</h2>
        
        <!-- Mood Section -->
        <h3 style="margin-top: 30px;">Your Mood</h3>
        <div id="moodLabel" style="font-size: 24px; margin: 10px 0; font-weight: bold;">
          <span id="moodNumber">5</span>/10 - <span id="moodText">Neutral</span>
        </div>
        <input type="range" min="1" max="10" value="5" class="slider" id="moodSlider" oninput="updateMoodLabel()">
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 20px;">
          <span style="font-size: 14px; color: #666;">Very Unpleasant</span>
          <span style="font-size: 14px; color: #666;">Very Pleasant</span>
        </div>
      
        <!-- Stress Section -->
        <h3 style="margin-top: 30px;">Stress Level</h3>
        <div id="stressLabel" style="font-size: 24px; margin: 10px 0; font-weight: bold;">
          <span id="stressNumber">5</span>/10 - <span id="stressText">Moderate</span>
        </div>
        <input type="range" min="1" max="10" value="5" class="slider" id="stressSlider" oninput="updateStressLabel()">
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 20px;">
          <span style="font-size: 14px; color: #666;">Very Low</span>
          <span style="font-size: 14px; color: #666;">Very High</span>
        </div>
        
        <!-- Productivity Section -->
        <h3 style="margin-top: 30px;">Productivity Level</h3>
        <div id="productivityLabel" style="font-size: 24px; margin: 10px 0; font-weight: bold;">
          <span id="productivityNumber">5</span>/10 - <span id="productivityText">Average</span>
        </div>
        <input type="range" min="1" max="10" value="5" class="slider" id="productivitySlider" oninput="updateProductivityLabel()">
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 20px;">
          <span style="font-size: 14px; color: #666;">Poor</span>
          <span style="font-size: 14px; color: #666;">High</span>
        </div>
        <p style="font-size: 12px; color: #666; text-align: center;">
          (1-4 = Poor | 5-7 = Average | 8-10 = High)
        </p>
        <button style="margin-top: 30px;" onclick="submitrenderActivityForm()">Next</button>
        <button onclick="renderCaffeineCheck()">Back: Caffein Intake</button>
      </div>
    `);
}

function updateCaffeineLabel() {
    const slider = document.getElementById("caffeineSlider");
    const numberElement = document.getElementById("caffeineNumber");
    const value = parseInt(slider.value);
    
    numberElement.textContent = value;
    
    // Optional: Add caffeine level text and color coding
    let caffeineText = "Moderate";
    if (value <= 30) caffeineText = "Low";
    else if (value <= 70) caffeineText = "Moderate";
    else caffeineText = "High";
    
    // Optional: If you add a text element for caffeine level description
    const textElement = document.getElementById("caffeineText");
    if (textElement) {
        textElement.textContent = caffeineText;
        textElement.style.color = value <= 30 ? "#34c759" : value <= 70 ? "#ff9500" : "#ff3b30";
    }
}

function updateMoodLabel() {
    const slider = document.getElementById("moodSlider");
    const numberElement = document.getElementById("moodNumber");
    const textElement = document.getElementById("moodText");
    const value = parseInt(slider.value);
    
    numberElement.textContent = value;
    
    let moodText = "Neutral";
    if (value <= 2) moodText = "Very Unpleasant";
    else if (value <= 4) moodText = "Unpleasant";
    else if (value <= 6) moodText = "Neutral";
    else if (value <= 8) moodText = "Pleasant";
    else moodText = "Very Pleasant";
    
    textElement.textContent = moodText;
    textElement.style.color = value <= 4 ? "#ff3b30" : value <= 6 ? "#ff9500" : "#34c759";
}

function updateStressLabel() {
    const slider = document.getElementById("stressSlider");
    const numberElement = document.getElementById("stressNumber");
    const textElement = document.getElementById("stressText");
    const value = parseInt(slider.value);
    
    numberElement.textContent = value;
    
    let stressText = "Moderate";
    if (value <= 2) stressText = "Very Low";
    else if (value <= 4) stressText = "Low";
    else if (value <= 6) stressText = "Moderate";
    else if (value <= 8) stressText = "High";
    else stressText = "Very High";
    
    textElement.textContent = stressText;
    textElement.style.color = value <= 4 ? "#34c759" : value <= 6 ? "#ff9500" : "#ff3b30";
}

function updateProductivityLabel() {
    const slider = document.getElementById("productivitySlider");
    const numberElement = document.getElementById("productivityNumber");
    const textElement = document.getElementById("productivityText");
    const value = parseInt(slider.value);
    
    numberElement.textContent = value;
    
    let productivityText = "Average";
    if (value <= 4) productivityText = "Poor";
    else if (value <= 7) productivityText = "Average";
    else productivityText = "High";
    
    textElement.textContent = productivityText;
    textElement.style.color = value <= 4 ? "#ff3b30" : value <= 7 ? "#ff9500" : "#34c759";
}

function submitDailyCheckIn() {
    const caffeine = document.querySelector('input[name="caffeineLevel"]:checked').value;
    const mood = document.getElementById("moodSlider").value;
    const stress = document.getElementById("stressSlider").value;
    const productivity = document.getElementById("productivitySlider").value;
    
    alert(`Daily check-in complete!\n\n• Caffeine: ${caffeine}\n• Mood: ${mood}/10\n• Stress: ${stress}/10\n• Productivity: ${productivity}/10`);
    renderActivityForm();
}

function login(e) {
    e.preventDefault();
    alert("Login successful");
    renderCaffeineCheck();
}