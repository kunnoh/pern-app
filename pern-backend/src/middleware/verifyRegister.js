const db = require('../models')
const ROLES = db.ROLES
const User = db.user

checkDuplicate = (req, res, next) => {
    User.findOne({
        where: { email: req.body.email }
    }).then(user =>{
        if(user) {
            res.status(400).json({
                error: 'user already exists'
            })
            return
        }
        next()
    })
}

checkRolesExist = (req, res, next) => {
    if(req.body.roles) {
        for(let i=0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({
                    error: 'role does not exist'
                })
                return
            }
        }
    }
    next()
}

const verifyRegister = {
    checkDuplicate: checkDuplicate,
    checkRolesExist: checkRolesExist
}

module.exports = verifyRegister