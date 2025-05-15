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
    return axios.post(`api/v1/login`, { email, password, delay: 2000 });
}
const postSignUp = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username });
}
const getQuizzByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitAnswers = (data) => {
    return axios.post(`api/v1/quiz-submit`, data);
}
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data)
}
const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}
const deleteQuizForAdmin = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}
const putEditQuiz = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty)
    data.append('userImage', image);
    return axios.put('api/v1/quiz', data)
}
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data)
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    })
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    })
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}
const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
}
const logOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    })
}
const getOverView = () => {
    return axios.get(`api/v1/overview`)
}
export {
    postCreateNewUser, getListTableUser, putEditUser,
    deleteUser, getListTableUserPaginate,
    postLogin, postSignUp, getQuizzByUser, getDataQuiz,
    postSubmitAnswers, postCreateNewQuiz, getAllQuizForAdmin,
    deleteQuizForAdmin, putEditQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAssignQuiz, getQuizWithQA, postUpsertQA,
    logOut, getOverView

};