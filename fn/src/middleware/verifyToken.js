import jwt from 'jsonwebtoken'
import UserModel from '../Backend/Models/UserModel.js'

export async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null) {
        res.status(401)?.json({ error: `Unauthorized` })
        return res.end()
    }
    const getUsers = await UserModel?.findOne({
        where: { refresh_token: token },
    })
    jwt.verify(getUsers?.refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403)?.json({ error: `token failed` })
            return res?.end()
        }
        req.email = decoded.email
        next(req, res, decoded)
    })
}
