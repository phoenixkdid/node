import express from 'express'
import nodeCleanup from 'node-cleanup'
import cors from 'cors'
import { createServer } from 'http'
import { init, cleanup } from './package/whatsapp.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'

const app = express()
const host = process.env.HOST || undefined
const port = parseInt(process.env.PORT ?? 5005)
dotenv.config()
app.use(cors({ credentials: true, origin: `http://0.0.0.0:3000` }))
app.use(cookieParser())

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const http = createServer(app)

const listenerCallback = () => {
    init()
    console.log(`Server is listening on http://${host ? host : '0.0.0.0'}:${port}`)
}
nodeCleanup(cleanup)
if (host) {
    http.listen(port, host, listenerCallback)
} else {
    http.listen(port, listenerCallback)
}

const io = new Server(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
const sockets = io
    .use(function (socket, next) {
        if (socket.handshake.auth && socket.handshake.auth.token) {
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

export { app, http, io, sockets }
