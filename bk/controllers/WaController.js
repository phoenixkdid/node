import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { generateApiKey } from 'generate-api-key'
import { isEmpty } from '../utils/helpers.js'
import UserModel from '../models/UserModel.js'
import SessionModel from '../models/SessionModel.js'
import {
    getSession,
    getChatList,
    isExists,
    sendMessage,
    formatPhone,
    createSession,
    isSessionExists,
} from '../package/whatsapp.js'
// import { createSession, isExists, isSessionExists } from '../package/whatsapp.js'
import response from '../response.js'

export default class WaController {
    constructor() {}
    async newSession(req, res) {
        try {
            const { id, isLegacy } = req.body

            const authHeader = req.headers.authorization
            const token = authHeader.split(' ')[1]
            const auth = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

            if (isSessionExists(id)) {
                res?.json(res, 409, false, 'Session already exists, please use another id.')
            }
            const create = await SessionModel.create({
                session_name: id,
                user_id: auth?.userId,
                token: generateApiKey({ method: 'uuidv4', length: 32 }),
                connnet: false,
                comment: '...',
            })

            createSession(id, isLegacy === 'true', res, create)
        } catch (error) {
            res.status(500).json({ msg: 'server error' })
        }
    }

    async readSession(req, res) {
        try {
            const authHeader = req.headers.authorization
            const token = authHeader.split(' ')[1]
            const auth = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

            const getSession = await SessionModel.findAll({
                where: {
                    user_id: auth?.userId,
                },
            })
            response(res, 200, true, '', getSession)
        } catch (error) {
            res.status(500).json({ msg: 'server error' })
        }
    }
    async sendText(req, res) {
        try {
          let maxAttempts = 3 // Jumlah maksimum percobaan pengiriman
          let attempts = 0 // Jumlah percobaan saat ini
          while (attempts < maxAttempts) {
              try {
                  const { phone, text } = req?.body
                  const msg = { text: text }
                  const token = req.headers.authorization

                  if (token == null) {
                      res.status(401)?.json({ error: `Unauthorized` })
                      return res.end()
                  }

                  const sessions = await SessionModel?.findOne({
                      where: { token: token },
                  })

                  const session_id = getSession(sessions?.session_name)

                  let number = formatPhone(req?.body?.phone)

                  const exists = await isExists(session_id, number)
                  if (!exists) {
                      attempts++
                      // console.error(`Failed to send message. Attempt ${attempts} of ${maxAttempts}.`)
                      // Tunggu beberapa detik sebelum mencoba mengirim kembali
                      await new Promise((resolve) => setTimeout(resolve, 5000))
                      // return response(res, 400, false, 'The receiver number is not exists.')
                  }
                  const sender = await sendMessage(session_id, number, msg, 0)
                  response(res, 200, true, 'The message has been successfully send.')
                  break // Keluar dari perulangan setelah pesan terkirim
              } catch (error) {
                  attempts++
                  // console.error(`Failed to send message. Attempt ${attempts} of ${maxAttempts}.`)
                  // Tunggu beberapa detik sebelum mencoba mengirim kembali
                  await new Promise((resolve) => setTimeout(resolve, 5000))
              }
          }

          if (attempts === maxAttempts) {
              response(res, 500, false, 'Failed to send the message after multiple attempts.')
          }
        } catch (error) {
             res.status(500).json({ msg: 'server error' })
        }
    }
   async sendTextV2(req, res) {
      try {
          let maxAttempts = 3 // Jumlah maksimum percobaan pengiriman
          let attempts = 0 // Jumlah percobaan saat ini
          while (attempts < maxAttempts) {
              try {
                  const { phone, text } = req?.body
                  const msg = { text: text }
                  const token = req.headers.userid
                  if (token == null) {
                      res.status(401)?.json({ error: `Unauthorized` })
                      return res.end()
                  }

                  const sessions = await SessionModel?.findOne({
                      where: { user_id: token },
                  })
                  const session_id = getSession(sessions?.session_name)

                  let number = formatPhone(req?.body?.phone)

                  const exists = await isExists(session_id, number)
                  if (!exists) {
                      attempts++
                      // console.error(`Failed to send message. Attempt ${attempts} of ${maxAttempts}.`)
                      // Tunggu beberapa detik sebelum mencoba mengirim kembali
                      await new Promise((resolve) => setTimeout(resolve, 5000))
                      // return response(res, 400, false, 'The receiver number is not exists.')
                  }
                  const sender = await sendMessage(session_id, number, msg, 0)
                  response(res, 200, true, 'The message has been successfully send.')
                  break // Keluar dari perulangan setelah pesan terkirim
              } catch (error) {
                  attempts++
                  // console.error(`Failed to send message. Attempt ${attempts} of ${maxAttempts}.`)
                  // Tunggu beberapa detik sebelum mencoba mengirim kembali
                  await new Promise((resolve) => setTimeout(resolve, 5000))
              }
          }

          if (attempts === maxAttempts) {
              response(res, 500, false, 'Failed to send the message after multiple attempts.')
          }
        } catch (error) {
             res.status(500).json({ msg: 'server error' })
        }
   }
  
  async sendMsg(req, res) {
      try {
          let maxAttempts = 3 // Jumlah maksimum percobaan pengiriman
          let attempts = 0 // Jumlah percobaan saat ini
          while (attempts < maxAttempts) {
              try {
                  const { phone, text } = req?.body
                  const msg = { text: text }
             
                  const sessions = await SessionModel?.findOne({
                      where: { user_id: token },
                  })
                  const session_id = getSession(sessions?.session_name)

                  let number = formatPhone(req?.body?.phone)

                  const exists = await isExists(session_id, number)
                  if (!exists) {
                      attempts++
                      // console.error(`Failed to send message. Attempt ${attempts} of ${maxAttempts}.`)
                      // Tunggu beberapa detik sebelum mencoba mengirim kembali
                      await new Promise((resolve) => setTimeout(resolve, 5000))
                      // return response(res, 400, false, 'The receiver number is not exists.')
                  }
                  const sender = await sendMessage(session_id, number, msg, 0)
                  response(res, 200, true, 'The message has been successfully send.')
                  break // Keluar dari perulangan setelah pesan terkirim
              } catch (error) {
                  attempts++
                  // console.error(`Failed to send message. Attempt ${attempts} of ${maxAttempts}.`)
                  // Tunggu beberapa detik sebelum mencoba mengirim kembali
                  await new Promise((resolve) => setTimeout(resolve, 5000))
              }
          }

          if (attempts === maxAttempts) {
              response(res, 500, false, 'Failed to send the message after multiple attempts.')
          }
        } catch (error) {
             res.status(500).json({ msg: 'server error' })
        }
   }

    viewSession() {}
}
