const express = require('express')
const cors = require('cors')


const authRoute = require('./routes/auth.route')
const usersRoute = require('./routes/users.route')
const authMiddl = require('./middleware')
const db = require('./models/index')
const Role = db.role
const User = db.user
db.sequalize.sync({force: true}).then(()=>{
    initial()
    userInit()
})
// create roles
function initial(){
    Role.create({
        role_id: 101,
        name: 'owner'
    })

    Role.create({
        role_id: 102,
        name: 'editor'
    })

    Role.create({
        role_id: 103,
        name: 'user'
    })
}

function userInit(){
    User.create({
        firstname: 'admin',
        lastname: 'admin',
        password: '$2a$10$QvglUO9qsl7UOJ7ghrfuUu/S49ZFFArGj.o6Mf7N4cEx2lTSyvgIq',
        email: 'admin@a.m',
        last_login: ''
    })
}

const app = express()

// serve public folder
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register api routes
// app.use('/', express.static("public"))
app.use('/auth', authRoute)
app.use('/users', authMiddl.authJwt.verifyToken, usersRoute)

module.exports = app