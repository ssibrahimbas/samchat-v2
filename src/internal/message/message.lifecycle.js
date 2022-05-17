const ChatService = require("~/internal/chat/chat.service");
const SessionService = require("~/internal/session/session.service");
const ChatLifecycle = require("~/internal/chat/chat.lifecycle");

const onSend = async ({ message, socket, io }) => {
  SessionService.updateLastSeen({ userId: socket.userId });
  const chat = await ChatService.update({
    senderId: socket.userId,
    message: message.id,
    chatId: message.chatId,
  });
  await ChatLifecycle.onUpdated({
    chat,
    socket,
    io,
  });
  socket.emit("event/message:sendSuccess.v1", {
    userId: socket.userId,
    message,
  });
  io.to(`user_${message.receiverId}`).emit("event/message:receive.v1", {
    userId: socket.userId,
    message,
  });
};

const onSeen = async ({ message, io, socket }) => {
  SessionService.updateLastSeen({ userId: socket.userId });
  io.to(`user_${message.receiverId}`).emit("event/message:seen.v1", {
    userId: socket.userId,
  });
};

const onRemove = async ({ message, io, socket }) => {
  SessionService.updateLastSeen({ userId: socket.userId });
  io.to(`user_${message.receiverId}`).emit("event/message:remove.v1", {
    userId: socket.userId,
    message,
  });
};

module.exports = {
  onSend,
  onSeen,
  onRemove,
};
