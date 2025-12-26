const API = "https://magic-bank-backend-production.up.railway.app/api";

async function login() {
  const email = email.value;
  const password = password.value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) return alert("Credenciales inválidas");

  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("user_id", data.user_id);

  if (data.role === "student") location.href = "dashboard.html";
  if (data.role === "tutor") location.href = "tutor-dashboard.html";
}

function requireAuth(role) {
  if (!localStorage.getItem("token") || localStorage.getItem("role") !== role) {
    location.href = "login.html";
  }
}

async function loadStudentStatus() {
  const res = await fetch(`${API}/student/${localStorage.user_id}/status`, {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  const data = await res.json();
  document.getElementById("student-status").innerText = data.status;
}

function logout() {
  localStorage.clear();
  location.href = "index.html";
}
