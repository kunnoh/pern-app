class AuthMiddleware{
    static isAuthenticated(req, res, next){
        // console.log(req.headers)
        return next()
    }
}

module.exports = AuthMiddleware