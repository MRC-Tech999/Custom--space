const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [{ user: String, message: String }]
});

module.exports = mongoose.model('Post', PostSchema);
