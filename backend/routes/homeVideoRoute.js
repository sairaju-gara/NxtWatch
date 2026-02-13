const express = require("express");
const router = express.Router();
const verifyToken = require("../middleWares/verifyToken");
const HomeVideoController = require("../controllers/HomeVideoController");

router.post("/add-video", verifyToken, HomeVideoController.addHomeVideos);
router.get("/getHomeVideos", verifyToken, HomeVideoController.getHomeVideos);
router.get("/:videoId", verifyToken, HomeVideoController.getVideoData);
router.put("/update/:videoId", HomeVideoController.updateVideoData);
module.exports = router;
