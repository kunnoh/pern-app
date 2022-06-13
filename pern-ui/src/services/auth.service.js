import axios from "axios";

// const api = 'http://localhost:8066';
const api = 'https://34.101.203.244/api';
const login = async (email, password) => {
    try {
        const user = await axios.post(api+'/auth/login', { email, password });
        localStorage.setItem('user', JSON.stringify(user.data));
        return user.data;
    } catch (err) {
        if(err.response.status === 401){
            throw { message: "incorect email or password" };
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

