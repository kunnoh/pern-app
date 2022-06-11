const express = require('express')
const cors = require('cors')


const authRoute = require('./routes/auth.route')
const usersRoute = require('./routes/users.route')
const AuthMiddleware = require('./middleware/auth.middleware')

const app = express()

// serve public folder
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register api routes
app.use('/auth', authRoute)
app.use('/users', AuthMiddleware.isAuthenticated, usersRoute)
app.use('**', (req, res) => res.status(200).json({ message: 'dashboard API' }))

module.exports = app