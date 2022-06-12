import axios from "axios";

const api = 'http://localhost:8066';

const login = async (email, password) => {
    try {
        const user = await axios.post(api+'/auth/login', { email, password });
        localStorage.setItem('user', JSON.stringify(user.data));
        return user.data;
    } catch (err) {
        throw err.response.data;
    }
}

const logout = async (accessToken) => {
    return await axios.get(api + "/auth/logout");
};

export default {
    login,
    logout
}

