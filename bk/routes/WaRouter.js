import express from 'express'
import WaController from '../controllers/WaController.js'
import { verifyToken } from '../middlewares/VerifyToken.js'
import { verifyTokenSession } from '../middlewares/verifyTokenSession.js'
// import { refreshToken } from '../controllers/RefreshToken.js'
const RouterWaController = new WaController()
const router = express.Router()

router.post('/new-session', verifyToken, RouterWaController?.newSession)
router.get('/get-session', verifyToken, RouterWaController?.readSession)
router.post('/sendText', verifyTokenSession, RouterWaController?.sendText)

router.post('/viewSession', verifyTokenSession, RouterWaController?.viewSession)

export default router
