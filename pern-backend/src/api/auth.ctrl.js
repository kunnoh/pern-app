const { loginUser, createUser } = require("../DAO/users.DAO")

class Authctrl {

    static async login(req, res){
        // check email and password
        let password, email
        try {
            password = req.body.password 
            email = req.body.email
        } catch (err) {
            console.error('error decoding credentials: ')
            res.status(400).json({message: 'Unauthorised', error: 'missing credentials'})
            return
        }

        // login user
        try {
            // get jwt token
            const refreshToken = 'mkpjm6pi5m4mhym9mh49m4w9440w49whm49'

            // check user in db
            let loggedUser = await loginUser(email, password)
            if(loggedUser){
                res.setHeader('authorization', 'Bearer '+loggedUser['accessToken'])
                res.setHeader('RefreshToken', refreshToken)
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

    static async register(req, res){
        const user = req.body
        const accessToken = "wegawefwfw3wfa3w3"
        const refreshToken = "wegawefwfw3wfa3w3"
        // register user
        try {
            // check user in db
            let regUser = await createUser(user)
            if(regUser){
                res.setHeader('authorization', 'Bearer '+accessToken)
                res.setHeader('RefreshToken', refreshToken)
                regUser['refreshToken'] = refreshToken
                regUser['accessToken'] = accessToken
                
                res.status(200).json(regUser)
                return
            }

        } catch (err) {
            console.error('Register Error::', err)
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