import axios from "axios";
import authHeader from "./auth-header";

import { api } from "../../environment/environment";

const getSubjects = (pageNo=1, itemsPerPage=20) => {
    return axios.get(api + "/subject", { headers: authHeader() });
}

const getSubject = (id) => {
    return axios.get(api + "/subject/"+id, { headers: authHeader() });
}

const createSubject = (user) => {
    return axios.post(api + "/subject", user, { headers: authHeader() });
}

const updateSubject = (user) => {
    return axios.patch(api + "/subject", user), { headers: authHeader() };
}

const deleteSubject = (user) => {
    return axios.delete(api + "/subject/"+user.id, { headers: authHeader() });
}

export default {
    createSubject,
    getSubject,
    getSubjects,
    updateSubject,
    deleteSubject

}