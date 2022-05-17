const sessions = {};

const isOnline = ({ userId }) => {
  return (
    !!sessions[userId] &&
    Math.floor(Date.now() / 1000) < sessions[userId].lastDate
  );
};

const updateLastDate = ({ userId }) => {
  if (sessions[userId]) {
    sessions[userId].lastDate = Math.floor(Date.now() / 1000) + 180;
  } else {
    sessions[userId] = {
      lastDate: Math.floor(Date.now() / 1000) + 180,
    };
  }
};

module.exports = {
  isOnline,
  updateLastDate,
};
