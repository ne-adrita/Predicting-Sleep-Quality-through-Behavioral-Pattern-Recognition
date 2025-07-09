const app = document.getElementById("app");

function renderPage(html) {
  app.innerHTML = html;
}

function showAlert(message, isError = false) {
  alert(message);
}

function getRandomScore() {
  return Math.floor(Math.random() * 100);
}