const { loginUser } = require("../models/users.model")

class Authctrl {

    static async login(req, res){
        // check email and password
        let password, email
        try {
            password, email = req.body
        } catch (err) {
            console.error('error decoding credentials: ')
            res.status(400).json({message: 'Unauthorised', error: 'missing credentials'})
            return
        }

        // login user
        try {
            // get jwt token
            const accessToken = 'futficr64d56v67v7ibguy'
            const refreshToken = 'mkpjm6pi5m4mhym9mh49m4w9440w49whm49'

            // check user in db
            let loggedUser = await loginUser(email, password)
            if(loggedUser){
                res.setHeader('authorization', 'Bearer '+accessToken)
                res.setHeader('RefreshToken', refreshToken)
                loggedUser['userInfo'] = [],
                loggedUser['token'] = accessToken,
                loggedUser['refreshToken'] = refreshToken
                
                res.status(200).json(loggedUser)
                return
            }

        } catch (err) {
            console.error('Login Error::', err)
            res.status(401).json(err)
            return
        }
    }

    static async logout(){
        // delete user token from sessions
        return { message: 'user logged out' }
    }
}


module.exports = Authctrl