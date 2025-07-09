function renderThankYou() {
    renderPage(`
      <div class="card">
        <h2>Thank You!</h2>
        <p>We appreciate you using Naptagram.</p>
        <button onclick="renderLogout()">Logout</button>
      </div>
    `);
  }