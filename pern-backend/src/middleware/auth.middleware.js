const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')

const User = db.user

verifyToken = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split('Bearer ')[1]
        jwt.verify(token, config.secret, (err, decoded) =>{
            if(err){
                console.error('jwt.verify():: ', err)
                res.status(401).json({ error: 'not authorized' })
                return
            }
            req.user_id = decoded.id
            next()
        })
    } catch (err) {
        console.log('error verifyToken()::', err)
        res.status(403).json({ error: 'access denied' })
        return
    }
}

isOwner = (req, res, next) => {
    User.findByPk(req.user_id).then(user=>{
        user.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === 'owner'){
                    next()
                    return
                }
            }
            res.status(403).json({ error: 'access denied' })
            return
        })
    })
}

isEditor = (req, res, next) => {
    User.findByPk(req.user_id).then(user=>{
        user.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === 'editor'){
                    next()
                    return
                }
            }
            res.status(403).json({ error: 'access denied' })
            return
        })
    })
}

isUser = (req, res, next) => {
    User.findByPk(req.user_id).then(user=>{
        user.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === 'user'){
                    next()
                    return
                }
            }
            res.status(403).json({ error: 'access denied' })
            return
        })
    })
}

isOwnerOrEditor = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "editor") {
                next();
                return;
                }
                if (roles[i].name === "owner") {
                next();
                return;
                }
            }
        res.status(403).json({ error: 'access denied' });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isOwner: isOwner,
    isEditor: isEditor,
    isUser: isUser,
    isOwnerOrEditor: isOwnerOrEditor
}

module.exports = authJwt