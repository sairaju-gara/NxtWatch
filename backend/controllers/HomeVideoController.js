const { response } = require("../app");
const HomeVideo = require("../models/HomeVideo");

const addHomeVideos = async (req, res) => {
  const videoData = req.body;
  if (!videoData || !videoData.length) {
    return res.status(400).json({ message: "No videos provided" });
  }
  try {
    const insertedVideos = await HomeVideo.insertMany(videoData);
    res.status(200).json({ insertedVideos });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getHomeVideos = async (req, res) => {
  const { search } = req.query;

  try {
    const homeVideosData = search
      ? await HomeVideo.find({
          title: { $regex: search, $options: "i" },
        })
      : await HomeVideo.find();
    res.status(200).json({ homeVideosData });
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
    const homeVideoData = await HomeVideo.findById(videoId);
    res.status(200).json({ homeVideoData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateVideoData = async (req, res) => {
  const { videoId } = req.params;
  const { subscribersCount, videoUrl, description } = req.body;
  try {
    const video = await HomeVideo.findByIdAndUpdate(
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
  addHomeVideos,
  getHomeVideos,
  getVideoData,
  updateVideoData,
};
