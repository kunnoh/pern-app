const config = require('../config/db.config')
const Sequalize = require('sequelize')

const sequalize = new Sequalize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {};
db.sequalize = sequalize
db.Sequalize = Sequalize

db.user = require('../models/user.model')(sequalize, Sequalize)
db.role = require('../models/role.model')(sequalize, Sequalize)

db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'role_id',
    otherKey: 'user_id'
})

db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'user_id',
    otherKey: 'role_id'
})

db.ROLES = ['owner', 'editor', 'user']

module.exports = db