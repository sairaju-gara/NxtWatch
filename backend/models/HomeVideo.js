const mongoose = require("mongoose");

const createHomeVideosSchema = new mongoose.Schema({
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

module.exports = mongoose.model("HomeVideo", createHomeVideosSchema);
