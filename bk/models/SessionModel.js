import { Sequelize } from 'sequelize'
import db from '../config/Database.js'

const { DataTypes } = Sequelize

const Session = db.define(
    'session',
    {
        session_name: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        phone: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
        },
        connnet: {
            type: DataTypes.BOOLEAN,
        },
        comment: {
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    }
)

;(async () => {
    await db.sync()
})()

export default Session
