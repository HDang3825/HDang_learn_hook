export const USER_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const doLogin = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data
    }
}
export const doLogOut = (data) => {
    return {
        type: USER_LOGOUT_SUCCESS,
        payload: data
    }
}