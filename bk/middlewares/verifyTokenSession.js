import jwt from 'jsonwebtoken'
import Session from '../models/SessionModel.js'

export async function verifyTokenSession(req, res, next) {
    const token = req.headers['authorization']
    if (token == null) {
        res.status(401)?.json({ error: `Unauthorized` })
        return res.end()
    }
    const getUsers = await Session?.findOne({
        where: { token: token },
    })

    if (getUsers) {
        next()
    } else {
        res.status(401)?.json({ error: `Unauthorized` })
        return res.end()
    }
}
