function renderActivityForm() {
    renderPage(`
      <form class="dashboard-form" onsubmit="handleActivitySubmit(event)">
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
      </form>
    `);
  }
  
  function handleActivitySubmit(e) {
    e.preventDefault();
    showAlert("Activity submitted");
    renderSleepSession();
  }