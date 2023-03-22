import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { isEmpty } from '../utils/helpers.js'
import UserModel from '../models/UserModel.js'
import response from '../response.js'

export default class UsersController {
    constructor() {}
    getUsers = async (req, res) => {
        try {
            const users = await UserModel.findAll({
                attributes: ['id', 'name', 'email'],
            })
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }
    async login(req, res) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required().min(6),
            })

            const { error } = schema.validate(req.body)

            if (error) {
                res.status(400).json({ error: `validate`, msg: error.details[0] })
            } else {
                const { email, password } = req.body
                const users = await UserModel.findOne({
                    where: {
                        email: email,
                    },
                })
                if (isEmpty(users)) {
                    res.status(403).json({ keys: 'email', msg: { message: 'Email tidak ditemukan' } })
                    res.end()
                }
                const match = await bcrypt.compare(password, users.password)
                if (!match) return res.status(400).json({ msg: 'Wrong Password' })
                const userId = users.id
                const name = users.name
                const mail = users.email
                const refreshToken = jwt.sign({ userId, name, mail }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '1d',
                })
                await UserModel.update(
                    { refresh_token: refreshToken },
                    {
                        where: {
                            id: userId,
                        },
                    }
                )
                res.json({ token: refreshToken, user: name, id: userId })
            }
        } catch (error) {
            console.log(error)
        }
    }
    async register(req, res) {
        const { name, email, password, confPassword } = req.body
        if (password !== confPassword) return res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' })
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        try {
            await UserModel.create({
                name: name,
                email: email,
                password: hashPassword,
            })
            res.json({ msg: 'Register Berhasil' })
        } catch (error) {
            console.log(error)
        }
    }
    async getMe(req, res) {
        try {
            const authHeader = req.headers.authorization
            const token = authHeader.split(' ')[1]
            const auth = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            const users = await UserModel.findAll({
                where: {
                    id: auth?.userId,
                },
            })
            return response(res, 200, true, '', users)
        } catch (error) {
            return response(res, 500, false, 'no auth.')
        }
    }
}
