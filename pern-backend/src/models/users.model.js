const { pool } = require('../db.config')

class UsersModel {
    static async createUser (user){
        user['joined'] = Date.now()
        try {
            const timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const userRes = await pool.query('INSERT INTO accounts (user_id, firstname, lastname, password, email, created_on) VALUES (DEFAULT, $1, $2, $3, $4, $5)', [user.firstname, user.lastname, 'fgif67iig', user.email, timeNow])
            const inserted = userRes.rows[0]
            return { message: "user created" }
        } catch (err) {
            console.error(err)
            // if (String(e).startsWith('MongoError: E11000 duplicate key error')) {
            //     return { error: 'User already exist' }
            // }
            return { error: 'error creating the user' }
        }
    }

    static async loginUser(email, password) {
        try {
            const user = await pool.query('SELECT * FROM accounts WHERE email = $1', [email])
            const userData = user.rows[0]
            if(!userData){
                throw { error: 'password or email incorrect' }
            } else {
                if(userData.password === password){
                    return userData
                }            
                throw { error: 'password or email incorrect' }
            }
        } catch (err) {
            // console.error(err)
            throw { error: 'password or email incorrect' }
        }
    }

    static async getUser(id){
        try {
            const user =  await pool.query('SELECT * FROM accounts WHERE user_id = $1', [id])
            const userData = user.rows
            return { userData }
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
            const users = await pool.query('SELECT * FROM accounts ORDER BY user_id ASC')
            const usersList = users.rows
            const totalUsers = users.rowCount
            return { usersList, totalUsers }
        } catch (e) {
            console.warn("Failed to get cursor on UsersModel::: ",e)
            return { err: e }
        }

    }

    static async updateUser(userToUpdate){
        try {
            const timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await pool.query('UPDATE accounts SET firstname = $1, lastname = $2, updated_at = $3 WHERE email = $4',
            [userToUpdate.firstname, userToUpdate.lastname, timeNow, userToUpdate.email])
            return { message: 'success' }    
        } catch (err) {
            console.error('Error updating user:: ',err)
            return { error: 'update failed'}
        }
    }

    static async deleteUser(email){
        try {
            const response = await pool.query('DELETE FROM accounts WHERE email = $1', [email])
            console.log(response)
            return { message: 'success' }
        } catch (err) {
            console.error(`Error removing user:: ${err}`);
            return { error: err };
        }
    }
}

module.exports = UsersModel