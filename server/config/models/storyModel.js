// story collection shema

const mongoose = require("mongoose");
const { STORY_COLLECTION } = require("../collections");

const storySchema = new mongoose.Schema(
  {
    url: { type: String },
    type: { type: String },
    header: { type: Object },
  },
  { timestamps: true }
);

const story = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    stories: { type: [storySchema] },
    date: Date,
  },
  {
    collection: STORY_COLLECTION,
  }
);

const model = mongoose.model("StoryData", story);

module.exports = model;
