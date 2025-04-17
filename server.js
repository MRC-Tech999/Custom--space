const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("./models/User");
const Post = require("./models/Post");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/socialapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const upload = multer({ dest: "uploads/" });

const secret = "votre_clé_secrète";

// Enregistrement
app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  const usernameRegex = /^[a-z0-9]+$/;

  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: "Pseudo invalide." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    username,
    certified: false,
    followers: [],
  });
  await user.save();
  res.json({ message: "Compte créé avec succès." });
});

// Connexion
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect." });
  }

  const token = jwt.sign({ id: user._id }, secret);
  res.json({ token, user });
});

// Poster du contenu
app.post("/api/post", upload.single("media"), async (req, res) => {
  const { userId, type, text } = req.body;
  const media = req.file ? req.file.filename : null;

  const post = new Post({
    userId,
    type,
    text,
    media,
    createdAt: new Date(),
  });

  await post.save();
  res.json({ message: "Post publié." });
});

// Chercher un utilisateur
app.get("/api/search/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });
  res.json(user);
});

// Obtenir les posts d’un utilisateur
app.get("/api/posts/:userId", async (req, res) => {
  const posts = await Post.find({ userId: req.params.userId });
  res.json(posts);
});

// Suivre un utilisateur
app.post("/api/follow", async (req, res) => {
  const { followerId, followedId } = req.body;
  const user = await User.findById(followedId);
  if (!user.followers.includes(followerId)) {
    user.followers.push(followerId);
    await user.save();
  }
  res.json({ message: "Abonnement effectué." });
});

// Notifications fictives (exemple simple)
app.get("/api/notifications/:userId", async (req, res) => {
  res.json([{ type: "comment", message: "Quelqu’un a commenté votre post." }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

