// story routers

const express = require("express");
const upload = require("../middlewares/imageUpload");
const { addStory, fetchStories } = require("../controllers/storyController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

// add user story route
router.post("/api/add-story", verifyJWT, upload.single("story"), addStory);

// get stories route
router.get("/api/fetch-stories", verifyJWT, fetchStories);

module.exports = router;
