const config = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: '0',
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.task = require('../models/task.model.js')(sequelize, Sequelize)

db.user.hasMany(db.task, { as: 'tasks' })
db.task.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user'
})

module.exports = db
