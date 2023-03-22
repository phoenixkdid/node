import { Server } from 'socket.io'
import { http } from '../server.js'
const io = new Server(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
const sockets = io
    .use(function (socket, next) {
        if (socket.handshake.auth && socket.handshake.auth.token) {
            console.log('>>', socket.handshake.auth.token)
            jwt.verify(socket.handshake.auth.token, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
                if (err) return next(new Error('Authentication error'))
                socket.decoded = decoded
                next()
            })
        } else {
            next(new Error('Authentication error'))
        }
    })
    .on('connection', function (socket) {
        socket.on('disconnect', () => {
            console.log('Socket Disconnect')
        })
        return socket
    })
export { io, sockets }
