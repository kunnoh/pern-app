import axios from "axios";
import authHeader from "./auth-header.service";

// const api = 'http://localhost:8066';
const api = 'https://34.101.203.244/api'

const getUsers = async (pageNo=1, itemsPerPage=20) => {
    return await axios.get(api + "/users", { headers: authHeader() });
}

const getUser = (id) => {
    return axios.get(api + "/users/"+id, { headers: authHeader() });
}

const createUser = async (email, lastname, firstname) => {
    return await axios.post(api + "/users", {email, firstname, lastname}, { headers: authHeader() });
}

const updateUser = async (lastname, firstname, email) => {
    return await axios.patch(api + "/users", {firstname, lastname, email}, { headers: authHeader() });
}

const deleteUser = async (email) => {
    return await axios.delete(api + "/users/"+email, { headers: authHeader() });
}

export default {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}