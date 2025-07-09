function renderScore() {
    const dailyScore = getRandomScore();
    const weeklyScore = getRandomScore();
  
    const dailyQuality = getSleepQualityLabel(dailyScore);
    const recommendation = getRecommendation(dailyScore);
  
    renderPage(`
      <div class="card">
        <h2>Daily Sleep Quality</h2>
        <div class="score-display">${dailyScore}%</div>
        <p>Today's sleep quality is <strong>${dailyQuality}</strong>.</p>
        <div class="chart-container">
          <canvas id="dailyChart" class="chart" width="200" height="200"></canvas>
        </div>
      </div>
      <div class="card" style="margin-top: 20px;">
        <h2>Weekly Sleep Quality</h2>
        <div class="chart-container">
          <canvas id="weeklyChart" class="chart" width="200" height="200"></canvas>
        </div>
      </div>
      <div class="card" style="margin-top: 20px;">
        <button onclick="renderRecommendation(${weeklyScore})">Next</button>
      </div>
    `);
  
    renderCircularChart('dailyChart', dailyScore, '#f953c6');
    renderCircularChart('weeklyChart', weeklyScore, '#b91d73');
  }
  
  function renderRecommendation(score) {
    const msg = getRecommendation(score);
  
    renderPage(`
      <div class="card">
        <h2>Recommendation</h2>
        <p>${msg}</p>
      </div>
      <div class="card" style="margin-top: 20px;">
        <button onclick="renderThankYou()">Next</button>
      </div>
    `);
  }
  
  function renderCircularChart(canvasId, score, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const angle = (score / 100) * 2 * Math.PI;
    
    ctx.clearRect(0, 0, 200, 200);
    
    // Background circle
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Score arc
    ctx.beginPath();
    ctx.arc(100, 100, 80, -0.5 * Math.PI, angle - 0.5 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Score text
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${score}%`, 100, 100);
  }
  
  function getSleepQualityLabel(score) {
    return score >= 85 ? 'Excellent' :
           score >= 75 ? 'Good' :
           score >= 60 ? 'Fair' :
           score >= 40 ? 'Moderate' : 'Poor';
  }
  function renderRecommendation(score) {
    if (score < 20) {
      return "😴 Very low sleep quality. Try going to bed earlier and avoid caffeine after 2 PM.";
    } else if (score < 40) {
      return "📵 Try reducing screen time before bed and create a calming bedtime routine.";
    } else if (score < 60) {
      return "⏰ Consider consistent sleep schedules and avoid heavy meals late at night.";
    } else if (score < 75) {
      return "🌙 You’re doing okay! A relaxing bedtime habit or better room lighting might help.";
    } else if (score < 85) {
      return "👍 Good sleep quality! Maintain your current routine and keep stress levels low.";
    } else {
      return "🌟 Excellent sleep! Your habits are working perfectly — keep it up!";
    }
  }