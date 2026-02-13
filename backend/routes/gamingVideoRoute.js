const express = require("express");
const verifyToken = require("../middleWares/verifyToken");
const gamingVideoController = require("../controllers/gamingVideoController");

const router = express.Router();
router.post("/add-video", verifyToken, gamingVideoController.addgamingVideo);
router.get(
  "/getGamingVideos",
  verifyToken,
  gamingVideoController.getGamingVideosData
);
router.get("/:videoId", verifyToken, gamingVideoController.getVideoData);
router.put("/update/:videoId", gamingVideoController.updateVideoData);
module.exports = router;
