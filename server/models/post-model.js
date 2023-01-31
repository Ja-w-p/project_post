const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  content: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    require: true,
  },
  auther: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  reply: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);
