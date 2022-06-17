const { pool } = require('../config/db.config')

const db = require('../models')
const config  = require('../config/auth.config')
const User = db.user
const Role = db.role
const Op = db.sequalize.Op

let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')


class UsersModel {
    static async createUser (user){
        try {
            let userCreated = await User.create({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: bcrypt.hashSync(user.password || 'uhehifhwiuhiu', 10),
                last_login: ''
            })



            if(user.roles) {
                const role = await Role.findAll({ 
                    raw: true,
                    where: {
                        [Op.or]: user.roles
                    }
                })
                await userCreated.setRoles(role)
                return { message: 'user created'}
            } else {
                await userCreated.setRoles([3])
                return { message: 'user created'}
            }
           
        } catch (err) {
            console.log(err)
            throw { error: 'error creating the user' }
        }

    }

    static async loginUser(email, password) {
        try {
            let user = await User.findOne({
                where: { email: email}
            })
            if(user){
                const checkPassword = bcrypt.compareSync(password, user.dataValues.password )

                console.log('check password', checkPassword)
                if(!checkPassword){
                    throw { error: 'incorrect email or password' }
                }
                const token = jwt.sign({id: user.dataValues.user_id}, config.secret,{
                    expiresIn: '1d'
                })
    
                let authorities = []
                const auths = user.getRoles()
                for(let i=0; i<auths.length; i++){
                    authorities.push(`ROLE_${auths[i].name.toUpperCase}`)
                }
                user.dataValues['roles'] = authorities
                user.dataValues['accessToken'] = token
                return user.dataValues
                    
            } else {
                throw { error: 'user does not exists' }
            }
        } catch (err) {
            console.log(err)
            throw { error: 'password or email incorrect' }
        }
    }

    static async getUser(email){
        try {
            let user = await User.findOne({
                where: { email: email}
            })
            const userData = user.rows
            return userData
        } catch (err) {
            console.error(err)
            return { error: "failed to get item"}
        }
    }

    static async getUsers({ filters={}, page, usersPerPage=0 } = {}){
        let query_params = {}
        
        if(filters){
            if("active" in filters){
                query_params = {active: filters.active}
            } 
        }

        console.log("QUERY PARAMS:: ", query_params)
        try {
            const usersList = await User.findAll({raw: true})
            const totalUsers = usersList.rowCount
            return { usersList, totalUsers }
        } catch (e) {
            console.warn("Failed to get cursor on UsersModel::: ",e)
            return { err: e }
        }

    }

    static async updateUser(userToUpdate){
        try {
            const timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await User.update(
                {
                    firstname: userToUpdate.firstname,
                    lastname: userToUpdate.lastname,
                },
                { where: { email: userToUpdate.email } }
            )
            return { message: 'success' }    
        } catch (err) {
            console.error('Error updating user:: ',err)
            return { error: 'update failed'}
        }
    }

    static async deleteUser(email){
        try {
            const response = await await User.destroy({ where: { email: email } })
            console.log(response)
            return { message: 'success' }
        } catch (err) {
            console.error(`Error removing user:: ${err}`);
            return { error: err };
        }
    }
}

module.exports = UsersModel