const ChatRepository = require("./chat.repository");

const create = async ({ invitedId, userId }) => {
  const chat = await ChatRepository.create({ invitedId, userId });
  return {
    success: true,
    message: "Chat created successfully.",
    data: chat,
  };
};

const getChatList = async ({ userId }) => {
  const chats = await ChatRepository.getChatList({ id: userId });
  return {
    success: true,
    message: "Chat fetched successfully.",
    data: chats,
  };
};

const findChat = async ({ query, userId }) => {
  const chats = await ChatRepository.filterChats({ query, userId });
  return {
    success: true,
    message: "Chats fetched successfully.",
    data: chats,
  };
};

const update = async ({ message, senderId, chatId }) => {
  const chat = await ChatRepository.update({ message, senderId, chatId });
  return {
    success: true,
    message: "Chat update successfully.",
    data: chat,
  };
};

module.exports = {
  create,
  getChatList,
  findChat,
  update,
};
