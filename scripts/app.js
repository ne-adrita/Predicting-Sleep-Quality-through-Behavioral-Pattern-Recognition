// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderLogin();
  });
  
  // Make functions globally available
  window.renderRegister = renderRegister;
  window.renderLogin = renderLogin;
  window.renderForgotPassword = renderForgotPassword;
  window.handleRegister = handleRegister;
  window.handleLogin = handleLogin;
  window.handleResetPassword = handleResetPassword;
  window.renderActivityForm = renderActivityForm;
  window.handleActivitySubmit = handleActivitySubmit;
  window.renderSleepSession = renderSleepSession;
  window.handleSleepSubmit = handleSleepSubmit;
  window.renderPattern = renderPattern;
  window.renderScore = renderScore;
  window.renderRecommendation = renderRecommendation;
  window.renderThankYou = renderThankYou;
  window.renderLogout = renderLogout;