const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
mongoose.connect("mongodb://localhost:27017/social", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(session({
  secret: "secure-social-key",
  resave: false,
  saveUninitialized: false,
}));

// Multer config
const upload = multer({ dest: "uploads/" });

// MODELS
const User = mongoose.model("User", new mongoose.Schema({
  username: { type: String, match: /^[a-z0-9]+$/, unique: true },
  email: String,
  password: String,
  verified: { type: Boolean, default: false },
  bio: String,
  profilePic: String,
  followers: [String],
  notifications: [String],
  isCertified: { type: Boolean, default: false }
}));

const Post = mongoose.model("Post", new mongoose.Schema({
  username: String,
  content: String,
  media: String,
  createdAt: Date,
  comments: [{
    user: String,
    text: String,
    date: Date
  }]
}));

// ROUTES

// Home
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!/^[a-z0-9]+$/.test(username)) return res.send("Nom d'utilisateur invalide");

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();

  // Email de confirmation (simulé ici)
  console.log(`Email de vérification envoyé à ${email}`);
  res.redirect("/login.html");
});

// Email vérification fictive
app.get("/verify", async (req, res) => {
  const { email } = req.query;
  await User.updateOne({ email }, { verified: true });
  res.send("Email vérifié. Vous pouvez vous connecter.");
});

// Login
app.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Email ou mot de passe incorrect.");
  }

  if (!user.verified) return res.send("Veuillez vérifier votre email.");

  req.session.user = user;
  res.redirect("/profile.html?user=" + user.username);
});

// Poster un contenu
app.post("/post", upload.single("media"), async (req, res) => {
  if (!req.session.user) return res.redirect("/login.html");

  const post = new Post({
    username: req.session.user.username,
    content: req.body.content,
    media: req.file ? req.file.filename : null,
    createdAt: new Date()
  });

  await post.save();
  res.redirect("/profile.html?user=" + req.session.user.username);
});

// Voir les publications
app.get("/posts", async (req, res) => {
  const posts = await Post.find({ username: req.query.user }).sort({ createdAt: -1 });
  res.json(posts);
});

// Commentaires
app.post("/comment", async (req, res) => {
  const { postId, text } = req.body;
  if (!req.session.user) return res.status(403).send("Non autorisé");

  await Post.updateOne({ _id: postId }, {
    $push: {
      comments: {
        user: req.session.user.username,
        text,
        date: new Date()
      }
    }
  });

  res.sendStatus(200);
});

// Rechercher utilisateur
app.get("/search", async (req, res) => {
  const q = req.query.q.toLowerCase();
  const users = await User.find({ username: new RegExp(q, "i") }).limit(10);
  res.json(users);
});

// Suivre un utilisateur
app.post("/follow", async (req, res) => {
  const target = req.body.username;
  if (!req.session.user || req.session.user.username === target) return res.sendStatus(400);

  await User.updateOne({ username: target }, {
    $addToSet: { followers: req.session.user.username },
    $push: { notifications: `${req.session.user.username} vous suit.` }
  });

  res.sendStatus(200);
});

// Notifications
app.get("/notifications", async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const user = await User.findOne({ username: req.session.user.username });
  res.json(user.notifications.reverse());
});

// Ajouter badge certifié (admin uniquement)
app.post("/certify", async (req, res) => {
  const { username } = req.body;
  if (req.session.user.username !== "harrysonmarc05") return res.sendStatus(403);

  await User.updateOne({ username }, { isCertified: true });
  res.send("Badge ajouté");
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
