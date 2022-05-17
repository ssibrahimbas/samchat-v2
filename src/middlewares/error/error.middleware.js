const wrapper = (listener, socket, io) => {
    return (params, callback) => listener(socket, params, callback, io).catch(err => {
        const data = {
            success: false,
            message: err.message
        }
        if(callback) {
            callback(data)
        }else {
            socket.emit("RuntimeError", data)
        }
    })
}

module.exports = {
    wrapper
}