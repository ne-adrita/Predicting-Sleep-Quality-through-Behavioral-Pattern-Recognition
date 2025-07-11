function renderDailyCheckIn() {
    renderPage(`
      <form onsubmit="submitCheckIn(event)">
        <h2> Daily Wellness Check-In</h2>
  
        <input type="number" id="caffeine" placeholder="☕ Caffeine Intake (mg: 1–100)" min="1" max="100" required>
        <p><small>📉 1–40: Low | ⚖️ 41–80: Moderate | 🚀 81–100: High</small></p>
  
        <input type="number" id="productivity" placeholder="📈 Productivity (1–10)" min="1" max="10" required>
        <p><small>😴 1–4: Low | ⚙️ 5–7: Average | 🔥 8–10: High</small></p>
  
        <input type="number" id="stress" placeholder="💢 Stress Level (1–10)" min="1" max="10" required>
        <p><small>😌 1–4: Low | 😬 5–7: Moderate | 😵 8–10: High</small></p>
  
        <input type="number" id="mood" placeholder="😊 Mood Level (1–10)" min="1" max="10" required>
        <p><small>😞 1–4: Bad | 🙂 5–7: Okay | 😄 8–10: Great</small></p>
  
        <button type="submit">✨ Submit Check-In</button>
      </form>
    `);
  }
  
  function submitCheckIn(e) {
    e.preventDefault();
  
    const caffeine = parseInt(document.getElementById("caffeine").value);
    const mood = parseInt(document.getElementById("mood").value);
    let message = "✅ Check-in complete!";
  
    if (caffeine > 80) {
      message += " 🚨 High caffeine! Try to balance with water.";
    }
    if (mood <= 4) {
      message += " 💡 Try doing something joyful today.";
    }
  
    alert(message);
    renderActivityForm(); 
  }
  