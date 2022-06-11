import axios from "axios";
import authHeader from "./auth-header";

import { api } from "../../environment/environment";

const getUsers = (pageNo=1, itemsPerPage=20) => {
    return axios.get(api + "/users", { headers: authHeader() });
}

const getUser = (id) => {
    return axios.get(api + "/users/"+id, { headers: authHeader() });
}

const createUser = (user) => {
    return axios.post(api + "/users", user, { headers: authHeader() });
}

const updateUser = (user) => {
    return axios.patch(api + "/users", user), { headers: authHeader() };
}

const deleteUser = (user) => {
    return axios.delete(api + "/users/"+user.id, { headers: authHeader() });
}

export default {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser

}