import { Sequelize } from 'sequelize'

const db = new Sequelize('api_sessions', 'api_sessions', 'ganteng123@~', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db
