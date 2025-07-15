function renderRegister() {
    renderPage(`
      <div class="app-name">Naptagram</div>
      <h2>Register</h2>
      <form onsubmit="register(event)">
        <input type="text" id="reg_user" placeholder="User ID" required><br>
        <input type="text" id="reg_name" placeholder="Name" required><br>
        <input type="number" id="reg_age" placeholder="Age" required><br>
        <select id="reg_gender" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select><br>
        <input type="password" id="reg_pass" placeholder="Password" required><br>
        <button type="submit">Register</button>
        <p onclick="renderLogin()">Already have an account? Login</p>
      </form>
    `);
  }
  
  function renderLogin() {
    renderPage(`
      <div class="app-name">Naptagram</div>
      <h2>Login</h2>
      <form onsubmit="login(event)">
        <input type="text" id="login_user" placeholder="User ID" required><br>
       <div class="password-container">
  <input type="password" id="reg_pass" placeholder="Password" required>
  <span class="toggle-password" onclick="togglePassword('reg_pass')">[👀]</span>
</div>
        <button type="submit">Login</button>
        <p onclick="renderForgotPassword()">Forgot Password?</p>
        <p onclick="renderRegister()">Don't have an account? Register</p>
      </form>
    `);
  }
  
  function renderForgotPassword() {
    renderPage(`
      <div class="app-name">Naptagram</div>
      <h2>Reset Password</h2>
      <form onsubmit="resetPassword(event)">
        <input type="text" id="reset_user" placeholder="Enter your User ID" required><br>
        <input type="password" id="new_password" placeholder="New Password" required><br>
        <input type="password" id="confirm_password" placeholder="Confirm New Password" required><br>
        <button type="submit">Reset Password</button>
        <p onclick="renderLogin()">Back to Login</p>
      </form>
    `);
  }
  
  function resetPassword(e) {
    e.preventDefault();
    const user = document.getElementById("reset_user").value;
    const newPass = document.getElementById("new_password").value;
    const confirmPass = document.getElementById("confirm_password").value;
  
    if (newPass !== confirmPass) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    fetch("http://localhost:5000/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: user, new_password: newPass })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Password reset successful!");
          renderLogin();
        }
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong. Try again later.");
      });
  }
  
  function register(e) {
    e.preventDefault();
    alert("Registered successfully");
    renderLogin();
  }
  
  function login(e) {
    e.preventDefault();
    alert("Login successful");
    renderActivityForm();
  }
  function login(e) {
    e.preventDefault();
    alert("Login successful");
    renderDailyCheckIn(); // Changed from renderCaffeineIntake()
  }

  function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
  }


  function renderLogout() {
    // Clear any existing profile icon
    const existingIcon = document.querySelector('.profile-icon');
    if (existingIcon) {
        existingIcon.remove();
    }
    
    function togglePassword(inputId) {
      const passwordInput = document.getElementById(inputId);
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }

    renderPage(`
      <div class="card">
        <h2>You have been logged out.</h2>
        <button onclick="renderLogin()">Back to Login Page</button>
      </div>
    `);
}