const { pool } = require('../db.config')

class UsersModel {
    static async createUser (user){
        user['joined'] = Date.now()
        try {
            const userRes = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password])
            const inserted = userRes.rows
            return { insertedId: inserted.id }
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
            const user =  await pool.query('SELECT * FROM users WHERE email $1', [email])
            const userData = user.rows
            if(!user){
                throw { error: 'password or email incorrect' }
            } else {
                if(user.password === password){
                    return user
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
            const user =  await pool.query('SELECT * FROM users WHERE id = $1', [id])
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
            } else if("dormant" in filters){
                query_params = {dormant: filters.dormant}
            } else if("package" in filters){
                query_params.query = {package: filters.package}
            } else if("uid" in filters){
                query_params.query = {uid: filters.uid}
            }
        }

        console.log("QUERY PARAMS:: ", query_params)
        try {
            const users = await pool.query('SELECT * FROM users')
            const usersList = users.rows
            const totalUsers = users.rowCount
            return { usersList, totalUsers }
        } catch (e) {
            console.warn("Failed to get cursor on UsersModel::: ",e)
            return { err: e }
        }
        // try {
        //     let displayCursor
        //     if(usersPerPage === "all"){
        //         displayCursor = cursor
        //     } else {
        //         displayCursor = cursor.limit(Number(usersPerPage)).skip(usersPerPage*page)
        //     }
            
        //     const usersList = await displayCursor.toArray()
        //     const totalUsers = await usersDB.countDocuments(query)
        //     return { usersList, totalUsers }
        // } catch (e) {
        //     console.error(`Failed toget array from cursor in tasksDAO: ,${e}`)
        //     return { err: e }
        // }

    }

    static async updateUser(userToUpdate){
        try {
            const user = await pool.query('UPDATE users SET email = $1, password = $2 WHERE id = $3',
            [userToUpdate.email, userToUpdate.password, userToUpdate.id])
            const updatedUser = user.rows
            return { updatedUser }    
        } catch (err) {
            console.error('Error updating user:: ',err)
            return { error: 'update failed'}
        }
    }

    static async deleteUser(id){
        try {
            const response = await pool.query('DELETE FROM users WHERE id = $1', [id])
            console.log(response)
            return { message: 'success' }
        } catch (err) {
            console.error(`Error removing user:: ${err}`);
            return { error: err };
        }
    }
}

module.exports = UsersModel