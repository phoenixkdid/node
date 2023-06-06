import express from 'express'
import WaController from '../controllers/WaController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { verifyTokenSession } from '../middlewares/verifyTokenSession.js'
// import { refreshToken } from '../controllers/RefreshToken.js'
const RouterWaController = new WaController()
const router = express.Router()

router.post('/new-session', verifyToken, RouterWaController?.newSession)
router.get('/get-session', verifyToken, RouterWaController?.readSession)
router.post('/sendText', RouterWaController?.sendTextV2)
router.post('/sendMsg', RouterWaController?.sendMsg)

router.post('/viewSession', RouterWaController?.viewSession)

export default router
