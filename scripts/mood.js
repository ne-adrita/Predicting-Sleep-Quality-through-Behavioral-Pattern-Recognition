function renderMoodCheck() {
    renderPage(`
      <div class="card" style="padding: 20px;">
        <h2>Mood Level</h2>
        
        <div style="margin: 30px 0; height: 2px; background: #eee;"></div>
        
        <div id="moodLabel" style="font-size: 24px; margin: 20px 0; font-weight: bold;">
          <span id="moodNumber">5</span>/10 - <span id="moodText">Neutral</span>
        </div>
        
        <div style="margin: 30px 0; height: 2px; background: #eee;"></div>
        
        <div style="display: flex; justify-content: space-between; width: 90%; margin: 0 auto 30px;">
          <span style="font-size: 14px; color: #666;">VERY UNPLEASANT</span>
          <span style="font-size: 14px; color: #666;">VERY PLEASANT</span>
        </div>
        
        <input type="range" min="1" max="10" value="5" class="slider" id="moodSlider" oninput="updateMoodLabel()">
        
        <</div>
      <div class="card" style="margin-top: 20px;">
        <button onclick="renderActivityForm()">Next</button>
        <button onclick="renderDailyCheckIn()">Back: Daily Check-In</button>
      </div>
      </div>
    `);
  }
  
  // Keep the updateMoodLabel() and submitMood() functions the same as before
  
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
    
    if (value <= 4) textElement.style.color = "#ff3b30";
    else if (value <= 6) textElement.style.color = "#ff9500"; 
    else textElement.style.color = "#34c759"; 
  }
  
  function submitMood() {
    const moodValue = document.getElementById("moodSlider").value;
    alert(`Mood recorded: ${moodValue}/10`);
    renderActivityForm();
  }