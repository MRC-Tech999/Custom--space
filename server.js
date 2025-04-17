const express = require('express');
const path = require('path');
const app = express();

// Middleware pour gérer les requêtes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Liste des utilisateurs en mémoire (à remplacer par une vraie base de données)
let users = [
  { username: 'john123', email: 'john@example.com', password: 'password123' }
];

// Serve les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour la page de connexion
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route pour la page d'inscription
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Route pour traiter l'inscription d'un nouvel utilisateur
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Vérification simple de l'unicité de l'email
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).send("Cet email est déjà utilisé.");
  }

  // Ajout de l'utilisateur à la liste (en mémoire)
  users.push({ username, email, password });
  res.redirect("/login");
});

// Route pour traiter la connexion d'un utilisateur
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).send("Email ou mot de passe incorrect.");
  }

  // Une fois l'utilisateur connecté, rediriger vers le profil
  res.redirect("/profile");
});

// Route pour afficher le profil de l'utilisateur
app.get("/profile", (req, res) => {
  // À ce stade, tu devrais probablement gérer la session de l'utilisateur
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
