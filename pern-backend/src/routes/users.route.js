const router = require('express').Router()
const Usersctrl = require('../api/users.ctrl')

// users routes
router.route('/').get(Usersctrl.getManyUsers)
router.route('/').post(Usersctrl.createUser)
router.route('/').patch(Usersctrl.updateUser)
router.route('/:email').delete(Usersctrl.deleteUser)
router.route('/:id').get(Usersctrl.getOneUser)
router.route('/total').get(Usersctrl.getTotalUsers)

module.exports = router