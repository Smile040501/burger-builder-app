import axios from "axios";

import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "../types";

export const authStart = () => {
    return {
        type: AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        payload: {
            idToken: token,
            userId,
        },
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        payload: {
            error,
        },
    };
};

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => async (dispatch, getState) => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => async (dispatch, getState) => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true,
    };
    const API_KEY = process.env.REACT_APP_API_KEY;
    let url = `${process.env.REACT_APP_SIGNUP_BASE_URL}?key=${API_KEY}`;
    if (!isSignup) {
        url = `${process.env.REACT_APP_SIGNIN_BASE_URL}?key=${API_KEY}`;
    }
    try {
        const res = await axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
        console.log(err);
        dispatch(authFail(err.response.data.error));
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        payload: {
            path,
        },
    };
};

export const authCheckState = () => async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
};
