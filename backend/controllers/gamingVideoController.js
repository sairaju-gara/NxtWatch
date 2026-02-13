const GamingVideo = require("../models/GamingVideo");

const addgamingVideo = async (req, res) => {
  const videoData = req.body;
  if (!videoData || !videoData.length) {
    return res.status(400).json({ message: "No videos provided" });
  }
  try {
    const insertedVideoData = await GamingVideo.insertMany(videoData);
    res.status(200).json({ insertedVideoData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getGamingVideosData = async (req, res) => {
  try {
    const gamingVideosData = await GamingVideo.find();
    res.status(200).json({ gamingVideosData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getVideoData = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    return res.json(400).json({ Error: "Invalid video" });
  }
  try {
    const gamingVideoData = await GamingVideo.findById(videoId);
    res.status(200).json({ gamingVideoData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateVideoData = async (req, res) => {
  const { videoId } = req.params;
  const { channel, videoUrl, description, publishedAt } = req.body;
  try {
    const video = await GamingVideo.findByIdAndUpdate(
      videoId,
      {
        $set: {
          channel,
          description,
          videoUrl,
          publishedAt,
        },
      },
      { new: true, runValidators: true }
    );
    res.status(200).send({ video });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addgamingVideo,
  getGamingVideosData,
  getVideoData,
  updateVideoData,
};
