const ChatService = require("./chat.service");
const ErrorMiddleware = require("~/middlewares/error/error.middleware");
const ChatLifecycle = require("./chat.lifecycle");

const join = (io, socket) => {
  socket.on(
    "chat:create.v1",
    ErrorMiddleware.wrapper(createListener, socket, io)
  );
  socket.on("chat:get.v1", ErrorMiddleware.wrapper(getListener, socket, io));
  socket.on("chat:find.v1", ErrorMiddleware.wrapper(findListener, socket, io));
};

const createListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!params || !callback || typeof params !== "object" || !params.invitedId)
    throw new Error("Parameter not retrieved");
  const result = await ChatService.create({
    invitedId: params.invitedId,
    userId: socket.userId,
  });
  callback(result);
  await ChatLifecycle.onCreated({ chat: result.data, socket, io });
};

const getListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!callback) throw new Error("Parameter not retrieved");
  const result = await ChatService.getChatList({ userId: socket.userId });
  callback(result);
};

const findListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!callback || !params || typeof params !== "object" || !params.query)
    throw new Error("Parameter not retrieved");
  const result = await ChatService.findChat({
    query: params.query,
    userId: socket.userId,
  });
  callback(result);
};

module.exports = {
  join,
};
