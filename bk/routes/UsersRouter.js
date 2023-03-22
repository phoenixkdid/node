import express from 'express'
import UserController from '../controllers/UsersController.js'
import { verifyToken } from '../middlewares/VerifyToken.js'
// import { refreshToken } from '../controllers/RefreshToken.js'
const UserControllerInstace = new UserController()
const router = express.Router()

router.post('/login', UserControllerInstace?.login)
router.post('/register', UserControllerInstace?.register)
router.get('/getUser', UserControllerInstace?.getUsers)
router.get('/getMe', verifyToken, UserControllerInstace?.getMe)

export default router
