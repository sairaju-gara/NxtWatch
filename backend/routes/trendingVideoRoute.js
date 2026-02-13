const express = require("express");
const router = express.Router();
const verifyToken = require("../middleWares/verifyToken");
const TrendingVideoController = require("../controllers/trendingVideoController");
router.post(
  "/add-video",
  verifyToken,
  TrendingVideoController.addTrendingVideo
);
router.get(
  "/getTrendingVideos",
  verifyToken,
  TrendingVideoController.getTrendingVideos
);
router.get("/:videoId", verifyToken, TrendingVideoController.getVideoData);
router.put(
  "/update/:videoId",

  TrendingVideoController.updateVideoData
);
module.exports = router;
