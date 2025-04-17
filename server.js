const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "/public/login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "/public/register.html")));
app.get("/profile", (req, res) => res.sendFile(path.join(__dirname, "/public/profile.html")));

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const valid = /^[a-z0-9]+$/.test(username);
  if (!valid) return res.status(400).send("Pseudo invalide : lettres minuscules et chiffres uniquement");

  const userExists = users.find(u => u.email === email || u.username === username);
  if (userExists) return res.status(400).send("Email ou pseudo déjà utilisé");

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashed });
  console.log("Utilisateur enregistré:", username);
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).send("Email non trouvé");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Mot de passe incorrect");

  res.redirect(`/profile?user=${user.username}`);
});

app.listen(3000, () => console.log("Serveur actif sur http://localhost:3000"));
