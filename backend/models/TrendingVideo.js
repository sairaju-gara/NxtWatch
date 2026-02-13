const mongoose = require("mongoose");

const trendingVideoSchema = new mongoose.Schema({
  id: String,
  channel: {
    name: String,
    profileImageUrl: String,
    subscribersCount: String,
  },
  publishedAt: String,
  thumbnailUrl: String,
  title: String,
  viewCount: String,
  videoUrl: String,
  description: String,
});

module.exports = mongoose.model("TrendingVideo", trendingVideoSchema);
