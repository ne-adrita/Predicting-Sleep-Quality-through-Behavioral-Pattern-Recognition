function renderRegister() {
    renderPage(`
      <div class="app-name">Naptagram</div>
      <h2>Register</h2>
      <form class="auth-form" onsubmit="handleRegister(event)">
        <input type="text" id="reg_user" placeholder="User ID" required><br>
        <input type="text" id="reg_name" placeholder="Name" required><br>
        <input type="number" id="reg_age" placeholder="Age" required><br>
        <select id="reg_gender" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select><br>
        <input type="number" id="reg_caffeine" placeholder="Caffeine Intake (mg)" min="1" max="100" required><br>
        <input type="password" id="reg_pass" placeholder="Password" required><br>
        <button type="submit">Register</button>
        <p class="clickable" onclick="renderLogin()">Already have an account? Login</p>
      </form>
    `);
  }
  
  function renderLogin() {
    renderPage(`
      <div class="app-name">Naptagram</div>
      <h2>Login</h2>
      <form class="auth-form" onsubmit="handleLogin(event)">
        <input type="text" id="login_user" placeholder="User ID" required><br>
        <input type="password" id="login_pass" placeholder="Password" required><br>
        <button type="submit">Login</button>
        <p class="clickable" onclick="renderForgotPassword()">Forgot Password?</p>
        <p class="clickable" onclick="renderRegister()">Don't have an account? Register</p>
      </form>
    `);
  }
  
  function renderForgotPassword() {
    renderPage(`
      <div class="app-name">Naptagram</div>
      <h2>Reset Password</h2>
      <form class="auth-form" onsubmit="handleResetPassword(event)">
        <input type="text" id="reset_user" placeholder="Enter your User ID" required><br>
        <input type="password" id="new_password" placeholder="New Password" required><br>
        <input type="password" id="confirm_password" placeholder="Confirm New Password" required><br>
        <button type="submit">Reset Password</button>
        <p class="clickable" onclick="renderLogin()">Back to Login</p>
      </form>
    `);
  }
  
  function handleRegister(e) {
    e.preventDefault();
    showAlert("Registered successfully");
    renderLogin();
  }
  
  function handleLogin(e) {
    e.preventDefault();
    showAlert("Login successful");
    renderActivityForm();
  }
  
  function handleResetPassword(e) {
    e.preventDefault();
    const user = document.getElementById("reset_user").value;
    const newPass = document.getElementById("new_password").value;
    const confirmPass = document.getElementById("confirm_password").value;
  
    if (newPass !== confirmPass) {
      showAlert("Passwords do not match. Please try again.", true);
      return;
    }
  
    // Simulate API call
    setTimeout(() => {
      showAlert("Password reset successful!");
      renderLogin();
    }, 500);
  }