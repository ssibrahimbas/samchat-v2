const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  lastMessage: {
    type: String,
    default: "",
  },
  lastSenderId: String,
  initiator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  invited: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Chat", chatSchema);
