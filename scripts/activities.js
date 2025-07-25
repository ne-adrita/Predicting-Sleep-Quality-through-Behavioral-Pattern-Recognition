// In activities.js - modify the renderActivityForm function
function renderActivityForm() {
    renderPage(`
      <form onsubmit="submitActivity(event)">
        <h2>Log Activity</h2>
        <input type="text" id="activity_id" placeholder="Activity ID" required>
        <input type="text" id="activity_user_id" placeholder="User ID" required>
        <select id="activity_type" required>
          <option value="">Select Activity</option>
          <option value="swimming">Swimming</option>
          <option value="walking">Walking</option>
          <option value="running">Running</option>
          <option value="gym">Gym</option>
          <option value="cycling">Cycling</option>
          <option value="nothing">Nothing</option>
        </select>
        <input type="number" id="activity_duration" placeholder="Duration (minutes)" required>
        <button type="submit">Submit</button>
        <button onclick="renderMoodStressCheck()">Back: Mood & Stress Check</button>
      </form>
    `);
  }
  
  function submitActivity(e) {
    e.preventDefault();
    alert("Activity submitted");
    renderSleepSession();
  }
  
  function submitActivity(e) {
    e.preventDefault();
    const type = document.getElementById("activity_type").value;
    const duration = document.getElementById("activity_duration").value;
    
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push({
        type,
        duration,
        date: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities));
    
    notifyNewActivity(); // Add this line
    alert("Activity submitted");
    renderSleepSession();
}