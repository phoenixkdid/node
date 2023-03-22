// import { Sequelize } from 'sequelize'

// const db = new Sequelize('wa_gateway', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
// })

// export default db
import { Sequelize } from 'sequelize'

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './config/database.sqlite',
})

export default db
