import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, pass, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', pass);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}
const getListTableUser = () => {
    return axios.get('api/v1/participant/all')
}
const putEditUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}
const deleteUser = (UserId) => {
    return axios.delete('api/v1/participant', { data: { id: UserId } })
}
const getListTableUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (email, password) => {
    return axios.post(`/api/v1/login`, { email, password });
}
const postSignUp = (email, password, username) => {
    return axios.post(`/api/v1/register`, { email, password, username });
}
export { postCreateNewUser, getListTableUser, putEditUser, deleteUser, getListTableUserPaginate, postLogin, postSignUp };