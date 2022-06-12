import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";
import AuthService from "../services/auth.service";

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (resp) => {
            dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: resp },
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.error.toString();
            dispatch({ type: LOGIN_FAIL });
            dispatch({ type: SET_MESSAGE, payload: message });
            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
     return AuthService.logout().then((r)=>{
        localStorage.removeItem('user');
        window.location.reload()
        dispatch({
          type: LOGOUT,
        });
        return Promise.resolve();
    });

};