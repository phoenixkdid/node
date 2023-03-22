import { app, http, sockets, io } from './server.js'
import UserRouter from './routes/UsersRouter.js'
import WaRouter from './routes/WaRouter.js'
app.use(UserRouter)
app.use(WaRouter)

export { app, http, sockets, io }
