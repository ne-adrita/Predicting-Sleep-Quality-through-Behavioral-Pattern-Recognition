function renderSleepSession() {
    renderPage(`
      <form onsubmit="submitSleep(event)">
        <h2>Sleep Session</h2>
        <input type="text" id="session_id" placeholder="Session ID" required>
        <input type="text" id="sleep_user_id" placeholder="User ID" required>
        <input type="date" id="sleep_date" required><br>
        <input type="number" id="sleep_duration" placeholder="Duration (hours)" required><br>
        <button type="submit">Submit Sleep</button>
        <button onclick="renderActivityForm()">Back: Log Activity</button>
      </form>
    `);
  }
  
  function submitSleep(e) {
    e.preventDefault();
    alert("Sleep session recorded");
    renderPattern();
  }
  
  function renderPattern() {
    renderPage(`
      <div class="card">
        <h2>Behavioral Pattern</h2>
        <p>Pattern ID: P12345</p>
        <p>User ID: U45678</p>
        <button onclick="renderScore()">Check Sleep Quality</button>
        <button onclick="renderSleepSession()">Back: Sleep Session</button>
      </div>
    `);
  }