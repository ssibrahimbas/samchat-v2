const MessageRepository = require("./message.repository");

const send = async ({ chatId, content, senderId, receiverId, isSeen }) => {
  const message = await MessageRepository.create({
    chatId,
    content,
    senderId,
    receiverId,
    isSeen,
  });
  return {
    success: true,
    message: "Message sended successfully.",
    data: message,
  };
};

const remove = async ({ userId, messageId }) => {
  const removedMessage = await MessageRepository.remove({ userId, messageId });
  return {
    success: true,
    message: "Message remove successfully.",
    data: removedMessage,
  };
};

const seen = async ({ userId, messageId }) => {
  const seenMessage = await MessageRepository.seen({ userId, messageId });
  return {
    success: true,
    message: "Message seen successfully.",
    data: seenMessage,
  };
};

const seenAll = async ({ userId, chatId }) => {
  await MessageRepository.seenAll({ userId, chatId });
  return {
    success: true,
    message: "Messages seen successfully.",
  };
};

const getAll = async ({ chatId, page, limit }) => {
  const messages = await MessageRepository.getAll({ chatId, page, limit });
  return {
    success: true,
    message: "Messages fetched successfully.",
    data: messages,
  };
};

module.exports = {
  send,
  remove,
  seen,
  seenAll,
  getAll,
};
