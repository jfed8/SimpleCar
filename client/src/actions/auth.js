import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import { REG_PASS, REG_FAIL, AUTH_FAIL, AUTH_PASS, LOGIN_FAIL, LOGIN_PASS, LOGOUT } from '../actions/types';


// Get User Info
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch ({
            type: AUTH_PASS,
            payload: res.data
        })
    } catch (err) {
        dispatch ({
            type: AUTH_FAIL
        })
    }
};


// Register New User
export const register = ({ first_name, last_name, email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const body = JSON.stringify({ first_name, last_name, email, password });

    console.log("Headers are:")

    try {
        const res = await axios.post('/api/users/create', body, config);
        
        dispatch({
            type: REG_PASS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => alert(error.msg));
        }
        dispatch({
            type: REG_FAIL
        })
    }
};


// Login Existing User
export const loginUser = ({ email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        
        dispatch({
            type: LOGIN_PASS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => alert(error.msg));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }

}


// Logout Current User
export const logoutUser = () => async dispatch => {
    // const res = await axios.post('/api/logout');

    dispatch({
        type: LOGOUT
    })
}