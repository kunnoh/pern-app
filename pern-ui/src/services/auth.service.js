import axios from "axios";
// import { api } from "../../environment/environment";

const api = 'http://localhost:8066';
const login = async (email, password) => {
    try {
        return await axios.post(api+'/auth/login', { email, password });        
    } catch (err) {
        throw err.response.data;
    }
}

const logout = (accessToken) => {
    axios.get(api + "/auth/logout").then((response) =>{
        localStorage.removeItem("user");
    })
};

export default {
    login,
    logout
}

