const MessageService = require("./message.service");
const ErrorMiddleware = require("~/middlewares/error/error.middleware");
const MessageLifecycle = require("./message.lifecycle");

const join = (io, socket) => {
  socket.on(
    "message:send.v1",
    ErrorMiddleware.wrapper(sendListener, socket, io)
  );
  socket.on(
    "message:seen.v1",
    ErrorMiddleware.wrapper(seenListener, socket, io)
  );
  socket.on(
    "message:seenAll.v1",
    ErrorMiddleware.wrapper(seenAllListener, socket, io)
  );
  socket.on(
    "message:getAll.v1",
    ErrorMiddleware.wrapper(getAllListener, socket, io)
  );
  socket.on(
    "message:remove.v1",
    ErrorMiddleware.wrapper(removeListener, socket, io)
  );
};

const sendListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (
    !params ||
    !callback ||
    typeof params !== "object" ||
    !params.chatId ||
    !params.content ||
    !params.receiverId
  )
    throw new Error("Parameter not retrieved");
  const result = await MessageService.send({
    chatId: params.chatId,
    content: params.content,
    senderId: socket.userId,
    receiverId: params.receiverId,
    isSeen: params.isSeen,
  });
  callback(result);
  await MessageLifecycle.onSend({
    message: result.data,
    socket,
    io,
  });
};

const seenListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!params || !callback || typeof params !== "object" || !params.messageId)
    throw new Error("Parameter not retrieved");
  const result = await MessageService.seen({
    userId: socket.userId,
    messageId: socket.messageId,
  });
  callback(result);
  await MessageLifecycle.onSeen({
    message: result.data,
    socket,
    io,
  });
};

const seenAllListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!params || !callback || typeof params !== "object" || !params.chatId)
    throw new Error("Parameter not retrieved");
  const result = await MessageService.seenAll({
    userId: socket.userId,
    chatId: params.chatId,
  });
  callback(result);
};

const getAllListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!params || !callback || typeof params !== "object" || !params.chatId)
    throw new Error("Parameter not retrieved");
  const result = await MessageService.getAll({
    chatId: params.chatId,
    page: params.page || 1,
    limit: params.limit || 20,
  });
  callback(result);
};

const removeListener = async (socket, params, callback, io) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!params || !callback || typeof params !== "object" || !params.messageId)
    throw new Error("Parameter not retrieved");
  const result = await MessageService.remove({
    userId: socket.userId,
    messageId: params.messageId,
  });
  callback(result);
  await MessageLifecycle.onRemove({
    message: result.data,
    socket,
    io,
  });
};

module.exports = {
  join,
};
