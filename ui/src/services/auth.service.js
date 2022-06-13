import axios from "axios";

const api = '/api';
const login = async (email, password) => {
    try {
        const user = await axios.post(api+'/auth/login', { email, password });
        console.log(user)
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
    logout
}

