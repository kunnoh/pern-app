const UsersModel = require("../DAO/users.DAO");

class Usersctrl {
    static async createUser(req,res){
        const user = req.body

        if(!user ){
            res.status(400).json({ error: "empty fields"});
            return;
        }

        // save user
        try {
            const saveResp = await UsersModel.createUser(user)
            res.status(201).json(saveResp)
            return
        } catch (err) {
            res.status(500).json(err)
            return
        }
        
    }

    static async getOneUser(req,res){
        const reqParam = req.params
        if(!reqParam.id ) return res.status(400).json({ error: "Bad request"});

        try {
            const user = await UsersModel.getUser(reqParam.id)
            res.status(200).json(user)
        } catch (err) {
            console.error(err)
            res.status(204).json({ error: 'error perfoming the query' })
            return
        }
    }

    static async getManyUsers(req,res){
        const reqQuery = req.query

        // create query   
        let pageNo, USERS_PER_PAGE

        try {
            USERS_PER_PAGE = (reqQuery.users_per_page === 'all') ? 'all' : reqQuery.users_per_page ? parseInt(reqQuery.users_per_page, 10) : 20
        } catch (err) {
            console.error(`Got bad value for users_per_page: ${err}`)
            USERS_PER_PAGE = 20
        }

        try {
            pageNo = reqQuery.page ? parseInt(reqQuery.page, 10): 0
        } catch(err) {
            console.error(`Got bad value for page: ${err}`)
            pageNo = 0
        }

        // filters
        const queryType = Object.keys(reqQuery)
        let filters = {}

        try {
            const { usersList, totalUsers } = await UsersModel.getUsers({
                filters,
                page: pageNo,
                usersPerPage: USERS_PER_PAGE
            })

            res.status(200).json({
                usersList: usersList,
                totalUsers: totalUsers,
                page: pageNo+1,
                pageSize: USERS_PER_PAGE,
            })
            return
        } catch (err) {
            console.error(err)
            res.status(500).json({error: 'error in performing the query'})
            return
        }

    }

    static async updateUser(req,res){
        const user = req.body

        if(!user ){
            res.status(400).json({ error: "empty fields"});
            return;
        }

        // update user
        try {
            const saveResp = await UsersModel.updateUser(user)
            res.status(201).json(saveResp)
            return
        } catch (err) {
            console.error(err)
            res.status(500).json(err)
            return
        }
    }

    static async deleteUser(req,res){
        const reqParam = req.params
        if(!reqParam.email ) return res.status(400).json({ error: "Bad request"});

        try {
            let r = await UsersModel.deleteUser(reqParam.email)
            res.status(200).json(r)
            return  
        } catch (err) {
            console.error(err)
            res.status(204).json({ error: 'error perfoming the query' })
            return
        }
    }

    static async getTotalUsers(req,res){
        res.status(200).json({ message: 'success' })
        return
    }
}

module.exports = Usersctrl