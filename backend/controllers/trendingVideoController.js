const TrendingVideo = require("../models/TrendingVideo");

const addTrendingVideo = async (req, res) => {
  const videoData = req.body;
  if (!videoData || !videoData.length) {
    return res.status(400).json({ message: "No videos provided" });
  }
  try {
    const insertedVideosData = await TrendingVideo.insertMany(videoData);
    res.status(200).json({ insertedVideosData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTrendingVideos = async (req, res) => {
  try {
    const trendingVideosData = await TrendingVideo.find();
    res.status(200).json({ trendingVideosData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getVideoData = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    return res.json(400).json({ Error: "Invalid video" });
  }
  try {
    const trendingVideoData = await TrendingVideo.findById(videoId);
    res.status(200).json({ trendingVideoData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateVideoData = async (req, res) => {
  const { videoId } = req.params;
  const { subscribersCount, videoUrl, description } = req.body;
  try {
    const video = await TrendingVideo.findByIdAndUpdate(
      videoId,
      {
        $set: {
          "channel.subscribersCount": subscribersCount,
          description,
          videoUrl,
        },
      },
      { new: true, runValidators: true }
    );
    res.status(200).send({ video });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addTrendingVideo,
  getTrendingVideos,
  getVideoData,
  updateVideoData,
};
