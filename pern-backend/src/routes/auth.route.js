const router = require('express').Router()
const Authctrl = require('../api/auth.ctrl')

// auth routes
router.route('/login').post(Authctrl.login)
router.route('/logout').get(Authctrl.logout)

module.exports = router