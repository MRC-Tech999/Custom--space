const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { userId, content, type } = req.body;
  const post = new Post({ user: userId, content, type });
  await post.save();
  res.status(201).json(post);
});

router.get('/user/:userId', async (req, res) => {
  const posts = await Post.find({ user: req.params.userId });
  res.json(posts);
});

router.post('/comment/:id', async (req, res) => {
  const { user, message } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ user, message });
  await post.save();
  const owner = await User.findById(post.user);
  owner.notifications.push(`${user} commented on your post`);
  await owner.save();
  res.json(post);
});

module.exports = router;
