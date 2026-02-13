const mongoose = require("mongoose");

const gamingVideoSchema = new mongoose.Schema({
  id: String,
  channel: {
    name: String,
    profileImageUrl: String,
    subscribersCount: String,
  },
  title: String,
  thumbnailUrl: String,
  videoUrl: String,
  description: String,
  viewCount: String,
  publishedAt: String,
});

module.exports = mongoose.model("GamingVideo", gamingVideoSchema);
