const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/public/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/public/register.html'));

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const validUsername = /^[a-z0-9]+$/.test(username);
  if (!validUsername) return res.status(400).send("Pseudo invalide");

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).send("Email déjà utilisé");

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashed });
  res.redirect('/login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Mot de passe incorrect");
  }

  res.redirect(`/profile.html?user=${user.username}`);
});

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
