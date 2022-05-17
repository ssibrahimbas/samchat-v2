const jwt = require("jsonwebtoken");
const SessionService = require("~/models/session/session.service")

useAuth = async(socket, next) => {
    if(socket.handshake.auth && socket.handshake.auth.token) {
        await loginUser({token: socket.handshake.auth.token, socket})
    }
    else if(socket.handshake.query && socket.handshake.query.token) {
        await loginUser({token: socket.handshake.query.token, socket})
    }
    next();
}

const loginUser = async({token, socket}) => {
    const result = await verifyToken({token});
    socket.authorized = true;
    socket.join(`user_${result.data.id}`);
    SessionService.isOnline({userId: result.data.id});
}

const verifyToken = async({token}) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decodedToken) => {
            if (err) {
                resolve({
                    success: false,
                    data: new Error("You are not authorized to access this page")
                });
                return;
            }
            resolve({
                success: true,
                data: decodedToken
            })
        });
    })
}

module.exports = {
    useAuth
}