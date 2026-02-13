const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const verifyToken = require("./middleWares/verifyToken");
const gamingVideoRoute = require("./routes/gamingVideoRoute");
const trendingVideoRoute = require("./routes/trendingVideoRoute");
const HomeVideoRoute = require("./routes/homeVideoRoute");
const HomeVideo = require("./models/HomeVideo");
const TrendingVideo = require("./models/TrendingVideo");
const GamingVideo = require("./models/GamingVideo");
const UserRoute = require("./routes/userRoute");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://nxt-watch-pgjo.vercel.app",
    credentials: true,
  }),
);
dotEnv.config();
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log(error));

app.use("/gaming", gamingVideoRoute);
app.use("/trending", trendingVideoRoute);
app.use("/home", HomeVideoRoute);
app.use("/nxtwatch", UserRoute);
app.get("/videos/:videoId", verifyToken, async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    return res.status(400).json({ Error: "Invalid videoID" });
  }
  try {
    let videoData = await HomeVideo.findById(videoId);
    if (!videoData) videoData = await GamingVideo.findById(videoId);
    if (!videoData) videoData = await TrendingVideo.findById(videoId);

    if (!videoData) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json({ videoData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.use(express.static("build"));
app.listen(port, () => console.log(`App running on port number ${port}`));

module.exports = app;
