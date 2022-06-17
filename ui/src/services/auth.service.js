import axios from "axios";

const api = 'api';
const login = async (email, password) => {
    try {
        const user = await axios.post(api+'/auth/login', { email, password });
        if(user){
            localStorage.setItem('user', JSON.stringify(user.data));
        };
        return user.data;
    } catch (err) {
        if(err.response.status === 401){
            throw { message: "incorrect email or password" };
        }
        throw err;
    }
}

const register = async (firstname, lastname, email, password) => {
    try {
        const user = await axios.post(api+'/auth/register', { firstname, lastname, email, password });
        return user.data;
    } catch (err) {
        throw err;
    }
}

const logout = async (accessToken) => {
    try {
        localStorage.removeItem("user");
        return await axios.get(api + "/auth/logout");
    } catch (err) {
        throw err;
    }
};

export default {
    login,
    logout,
    register
}

