const SessionService = require("~/internal/session/session.service");

const onCreated = async ({ chat, socket, io }) => {
  SessionService.updateLastSeen({ userId: socket.userId });
  io.to(`user_${chat.invited.id}`).emit("event/chat:created.v1", {
    userId: socket.userId,
    chat,
  });
};

const onUpdated = async ({ chat, socket, io }) => {
  SessionService.updateLastSeen({ userId: socket.userId });
  io.to(`user_${chat.invited.id}`)
    .to(`user_${chat.initiator.id}`)
    .emit("event/chat:updated.v1", {
      userId: socket.userId,
      chat,
    });
};

module.exports = {
  onCreated,
  onUpdated,
};
