// post collection shema

const mongoose = require("mongoose");
const { POST_COLLECTION } = require("../collections");

const commentSchema = new mongoose.Schema({
  userDetails: Object,
  comment: String,
  date: Date,
});

const postSchema = new mongoose.Schema({
  img: Array,
  desc: String,
  likes: Array,
  comments: [commentSchema],
  date: Date,
});

const post = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    posts: { type: [postSchema], required: true },
  },
  {
    collection: POST_COLLECTION,
  }
);

const model = mongoose.model("PostData", post);

module.exports = model;
