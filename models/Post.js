const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: String,
  type: String, // text, image, video
  text: String,
  media: String,
  createdAt: Date,
});

module.exports = mongoose.model("Post", PostSchema);
