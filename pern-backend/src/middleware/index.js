const authJwt = require('./auth.middleware')
const verifyRegister = require('./verifyRegister')

module.exports = {
    authJwt,
    verifyRegister
}