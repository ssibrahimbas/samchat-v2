const UserListener = require("~/internal/user/user.listener");
const ChatListener = require("~/internal/chat/chat.listener");
const MessageListener = require("~/internal/message/message.listener");
const SessionListener = require("~/internal/session/session.listener");

const deploy = (io, socket) => {
  UserListener.join(io, socket);
  ChatListener.join(io, socket);
  MessageListener.join(io, socket);
  SessionListener.join(io, socket);
};

module.exports = {
  deploy,
};
