function renderScore() {
    const dailyScore = Math.floor(Math.random() * 100);
    const weeklyScore = Math.floor(Math.random() * 100);
  
    const dailyQuality =
      dailyScore >= 85 ? "Excellent" :
      dailyScore >= 75 ? "Good" :
      dailyScore >= 60 ? "Fair" :
      dailyScore >= 40 ? "Moderate" : "Poor";
  
    const recommendation = renderRecommendation(dailyScore);
  
    renderPage(`
      <div class="card">
        <h2>Daily Sleep Quality</h2>
        <div style="font-size: 32px; background: linear-gradient(to right, #f953c6, #b91d73); -webkit-background-clip: text; color: transparent; font-weight: bold;">${dailyScore}%</div>
        <p>Today's sleep quality is <strong>${dailyQuality}</strong>.</p>
        <canvas id="dailyChart" width="200" height="200"></canvas>
      </div>
      <div class="card" style="margin-top: 20px;">
        <h2>Weekly Sleep Quality</h2>
        <canvas id="weeklyChart" width="200" height="200"></canvas>
      </div>
      <div class="card" style="margin-top: 20px;">
        <button onclick="renderRecommendation(${weeklyScore})">Next</button>
        <button onclick="renderPattern()">Back: Behavioral Pattern</button>
      </div>
    `);
  
    // Daily circular chart
    const ctxDaily = document.getElementById("dailyChart").getContext("2d");
    const angleDaily = (dailyScore / 100) * 2 * Math.PI;
    ctxDaily.clearRect(0, 0, 200, 200);
    ctxDaily.beginPath();
    ctxDaily.arc(100, 100, 80, 0, 2 * Math.PI);
    ctxDaily.strokeStyle = "#eee";
    ctxDaily.lineWidth = 15;
    ctxDaily.stroke();
    ctxDaily.beginPath();
    ctxDaily.arc(100, 100, 80, -0.5 * Math.PI, angleDaily - 0.5 * Math.PI);
    ctxDaily.strokeStyle = "#f953c6";
    ctxDaily.lineWidth = 15;
    ctxDaily.stroke();
    ctxDaily.fillStyle = "#333";
    ctxDaily.font = "20px Arial";
    ctxDaily.textAlign = "center";
    ctxDaily.textBaseline = "middle";
    ctxDaily.fillText(`${dailyScore}%`, 100, 100);
  
    // Weekly circular chart
    const ctxWeekly = document.getElementById("weeklyChart").getContext("2d");
    const angleWeekly = (weeklyScore / 100) * 2 * Math.PI;
    ctxWeekly.clearRect(0, 0, 200, 200);
    ctxWeekly.beginPath();
    ctxWeekly.arc(100, 100, 80, 0, 2 * Math.PI);
    ctxWeekly.strokeStyle = "#eee";
    ctxWeekly.lineWidth = 15;
    ctxWeekly.stroke();
    ctxWeekly.beginPath();
    ctxWeekly.arc(100, 100, 80, -0.5 * Math.PI, angleWeekly - 0.5 * Math.PI);
    ctxWeekly.strokeStyle = "#b91d73";
    ctxWeekly.lineWidth = 15;
    ctxWeekly.stroke();
    ctxWeekly.fillStyle = "#333";
    ctxWeekly.font = "20px Arial";
    ctxWeekly.textAlign = "center";
    ctxWeekly.textBaseline = "middle";
    ctxWeekly.fillText(`${weeklyScore}%`, 100, 100);
  }
  
  function renderRecommendation(score) {
    let msg = "Keep up your healthy habits!";
  
    if (score < 20) {
      msg = "Very low sleep quality. Try going to bed earlier and avoiding caffeine in the evening.";
    } else if (score < 40) {
      msg = "Try reducing screen time before bed and create a calming bedtime routine.";
    } else if (score < 60) {
      msg = "Consider consistent sleep schedules and limit heavy meals close to bedtime.";
    } else if (score < 75) {
      msg = "You're doing okay! Aim to improve your wind-down routine or room environment.";
    } else if (score < 85) {
      msg = "Good sleep quality! Try sticking to your current routine and avoid late-night stress.";
    } else if (score <= 100) {
      msg = "Excellent sleep! Your habits are clearly working — keep maintaining that rhythm.";
    }
  
    renderPage(`
      <div class="card">
        <h2>Recommendation</h2>
        <p>${msg}</p>
      </div>
      <div class="card" style="margin-top: 20px;">
        <button onclick="renderThankYou()">Next</button>
        <button onclick="renderScore()">Back: Score</button>
      </div>
    `);
  }