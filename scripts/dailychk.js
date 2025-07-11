// Page 1: Caffeine Level
function renderCaffeineCheck() {
    renderPage(`
      <div class="card" style="padding: 20px;">
        <h2>Caffeine Intake</h2>
        
        <div id="caffeineLabel" style="font-size: 24px; margin: 20px 0; font-weight: bold;">
          <span id="caffeineNumber">50</span>mg
        </div>
        
        <input type="range" min="0" max="100" value="50" class="slider" id="caffeineSlider" oninput="updateCaffeineLabel()">
        
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 30px;">
          <span style="font-size: 14px; color: #666;">None</span>
          <span style="font-size: 14px; color: #666;">100mg</span>
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
  
  // Page 2: Mood and Stress Level
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
          <span id="stressNumber">5</span>/10
        </div>
        <input type="range" min="1" max="10" value="5" class="slider" id="stressSlider" oninput="updateStressLabel()">
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 20px;">
          <span style="font-size: 14px; color: #666;">Low</span>
          <span style="font-size: 14px; color: #666;">High</span>
        </div>
        
        <button style="margin-top: 30px;" onclick="renderProductivityCheck()">Next</button>
      </div>
    `);
  }
  
  // Page 3: Productivity Level
  function renderProductivityCheck() {
    renderPage(`
      <div class="card" style="padding: 20px;">
        <div style="text-align: left; margin-bottom: 20px;">
          <span style="cursor:pointer; color:#007AFF;" onclick="renderMoodStressCheck()">← Back</span>
        </div>
        
        <h2>Productivity Level</h2>
        
        <div id="productivityLabel" style="font-size: 24px; margin: 20px 0; font-weight: bold;">
          <span id="productivityNumber">5</span>/10
        </div>
        
        <input type="range" min="1" max="10" value="5" class="slider" id="productivitySlider" oninput="updateProductivityLabel()">
        
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 30px;">
          <span style="font-size: 14px; color: #666;">Low</span>
          <span style="font-size: 14px; color: #666;">High</span>
        </div>
        
        <button onclick="submitDailyCheckIn()">Complete Check-In</button>
      </div>
    `);
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
    numberElement.textContent = slider.value;
  }
  
  function updateProductivityLabel() {
    const slider = document.getElementById("productivitySlider");
    const numberElement = document.getElementById("productivityNumber");
    numberElement.textContent = slider.value;
  }
  

  function submitDailyCheckIn() {
    const caffeine = document.getElementById("caffeineSlider").value;
    const mood = document.getElementById("moodSlider").value;
    const stress = document.getElementById("stressSlider").value;
    const productivity = document.getElementById("productivitySlider").value;
    
    alert(`Daily check-in complete!\n\n• Caffeine: ${caffeine}mg\n• Mood: ${mood}/10\n• Stress: ${stress}/10\n• Productivity: ${productivity}/10`);
    renderActivityForm(); 
  }
  
  
  function login(e) {
    e.preventDefault();
    alert("Login successful");
    renderCaffeineCheck();
  }