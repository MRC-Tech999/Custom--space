const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile by username
router.get('/profile/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate('followers');
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Search users
router.get('/search/:keyword', async (req, res) => {
  const regex = new RegExp(req.params.keyword, 'i');
  const users = await User.find({ username: regex });
  res.json(users);
});

// Follow user
router.post('/follow/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const me = await User.findById(req.body.myId);
  if (!user || !me) return res.status(404).json({ error: "User not found" });

  if (!user.followers.includes(me._id)) {
    user.followers.push(me._id);
    await user.save();
    user.notifications.push(`${me.username} started following you`);
    await user.save();
    res.json({ message: "Followed" });
  } else {
    res.status(400).json({ error: "Already following" });
  }
});

// Add badge (admin only)
router.post('/badge/:id', async (req, res) => {
  const { isCertified } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { isCertified }, { new: true });
  res.json(user);
});

module.exports = router;
