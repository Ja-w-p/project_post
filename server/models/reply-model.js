const mongoose = require("mongoose");
const replySchema = mongoose.Schema({
  name: {
    type: String,
  },
  view: {
    type: String,
    enum: ["讚", "噓", "無"],
    default: "無",
    required: true,
  },
  comment: {
    type: String,
    minlength: 1,
    maxlength: 20,
    required: true,
  },

  commentDate: {
    type: Date,
    default: Date.now(),
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Reply", replySchema);
