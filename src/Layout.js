import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Home from './components/Home/Home';
import MangeUser from './components/Admin/content/ManageUser';
import DashBoard from './components/Admin/content/DashBoard';
import Login from './components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignUp from './components/Auth/SignUp';
import ListQuizz from './components/User/ListQuizz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Quiz/ManageQuiz';
import ManageQuestions from './components/Admin/Questions/ManageQuestions';
const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger text-center'>
            Trang không tồn tại!
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />} />
                    <Route path='users' element={<ListQuizz />} />
                </Route>
                <Route path='/admins' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<MangeUser />} />
                    <Route path='manage-quiz' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<ManageQuestions />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer autoClose='3000' />
        </>
    )
}
export default Layout;