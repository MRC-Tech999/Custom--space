// API base URL
const apiUrl = 'https://ton-backend.vercel.app'; // À modifier selon ton backend

// ===== LOGIN =====
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('userToken', data.token);
    window.location.href = 'profile.html';
  } else {
    alert(data.message || 'Erreur de connexion');
  }
});

// ===== REGISTER =====
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert('Compte créé ! Connecte-toi.');
    window.location.href = 'login.html';
  } else {
    alert(data.message || 'Erreur d’inscription');
  }
});

// ===== RECHERCHE =====
function searchUser() {
  const username = document.getElementById('searchInput').value;
  if (username) {
    window.location.href = `search.html?user=${encodeURIComponent(username)}`;
  }
}

// ===== AFFICHAGE PROFIL / RECHERCHE =====
window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const searchedUser = params.get('user');

  if (window.location.pathname.includes('search.html') && searchedUser) {
    const res = await fetch(`${apiUrl}/users/${searchedUser}`);
    const data = await res.json();
    const container = document.getElementById('searchResults');
    if (res.ok) {
      container.innerHTML = `
        <div class="user-result">
          <img src="default-profile.png" class="mini-pic">
          <p><a href="profile.html?user=${data.username}">@${data.username}</a></p>
        </div>
      `;
    } else {
      container.innerHTML = `<p>Aucun utilisateur trouvé.</p>`;
    }
  }
});
