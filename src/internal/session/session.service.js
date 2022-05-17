const SessionRepository = require("./session.repository");

const isOnline = ({ userId }) => {
  const result = SessionRepository.isOnline({ userId });
  return {
    success: true,
    message: "Login information successfully retrieved.",
    data: {
      isOnline: result,
    },
  };
};

const updateLastSeen = ({ userId }) => {
  SessionRepository.updateLastDate({ userId });
};

module.exports = {
  isOnline,
  updateLastSeen,
};
