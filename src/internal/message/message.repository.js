const MessageSchema = require("./message.schema");

const create = async ({ chatId, content, senderId, receiverId, isSeen }) => {
  return MessageSchema.create({
    chatId,
    content,
    senderId,
    receiverId,
    isSeen,
  });
};

const remove = async ({ userId, messageId }) => {
  const message = await MessageSchema.findById(messageId);
  if (message.senderId !== userId)
    throw new Error("You can only delete your own messages");
  message.isDeleted = true;
  return message.save();
};

const seen = async ({ userId, messageId }) => {
  const message = await MessageSchema.findById(messageId);
  if (message.senderId === userId) {
    message.isSeen = true;
    return message.save();
  }
  return null;
};

const seenAll = async ({ userId, chatId }) => {
  const messages = await MessageSchema.find({
    chatId,
    senderId: userId,
    isSeen: false,
  });
  for (const message of messages) {
    await seen({ userId, messageId: message.id });
  }
};

const getAll = async ({ chatId, page, limit }) => {
  return MessageSchema.find({ chatId })
    .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

module.exports = {
  create,
  remove,
  seen,
  seenAll,
  getAll,
};
