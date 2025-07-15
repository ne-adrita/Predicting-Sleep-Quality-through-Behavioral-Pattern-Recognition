function renderMoodStressCheck() {
    renderPage(`
      <div class="card" style="padding: 20px;">
      
        
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
        </p>
        
        <button style="margin-top: 30px;" onclick="submitMoodCheck()">Complete Check-In</button>
         <button onclick="renderCaffeineCheck()">Back: Caffeine Check</button>
      </div>
    `);
    
    
    updateMoodLabel();
    updateStressLabel();
    updateProductivityLabel();
}

// (function submitMoodCheck() {
   // const mood = document.getElementById("moodSlider").value;
    //const stress = document.getElementById("stressSlider").value;
    //const productivity = document.getElementById("productivitySlider").value;
    
   // console.log(`Check-in complete:
  //  - Mood: ${mood}/10
   // - Stress: ${stress}/10
  //  - Productivity: ${productivity}/10`);
    
 //   renderActivityForm(); }

 function submitMoodCheck() {
  const mood = document.getElementById("moodSlider").value;
  const stress = document.getElementById("stressSlider").value;
  const productivity = document.getElementById("productivitySlider").value;
  
  const moodChecks = JSON.parse(localStorage.getItem('moodChecks')) || [];
  moodChecks.push({
      mood,
      stress,
      productivity,
      date: new Date().toISOString()
  });
  localStorage.setItem('moodChecks', JSON.stringify(moodChecks));
  
  notifyNewActivity(); 
  renderActivityForm();
}