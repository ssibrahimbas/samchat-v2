const ChatSchema = require("./chat.schema");

const create = async ({ invitedId, userId }) => {
  return ChatSchema.create({
    invited: invitedId,
    initiator: userId,
  });
};

const getChatList = async ({ id }) => {
  return ChatSchema.find({
    $or: [{ invited: id }, { initiator: id }],
  }).populate("invited initiator");
};

const filterChats = async ({ query, userId }) => {
  return (await getChatList({ id: userId })).filter((c) => {
    if (c.invited.id === userId) {
      return c.initiator.username.toLowerCase().includes(query.toLowerCase());
    } else {
      return c.invited.username.toLowerCase().includes(query.toLowerCase());
    }
  });
};

const update = async ({ message, senderId, chatId }) => {
  let chat = await ChatSchema.findById(chatId);
  if (!chat) throw new Error("Chat not found");
  if (chat.initiator !== senderId && chat.invited !== senderId)
    throw new Error("You can't update someone else's chat");
  chat.lastMessage = message;
  chat.lastSenderId = senderId;
  chat = await chat.save();
  return chat;
};

module.exports = {
  create,
  getChatList,
  filterChats,
  update,
};
