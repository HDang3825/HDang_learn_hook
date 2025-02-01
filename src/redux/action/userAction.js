export const USER_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const doLogin = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data
    }
}