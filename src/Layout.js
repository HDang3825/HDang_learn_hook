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
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />} />
                    <Route path='users' element={<User />} />
                </Route>
                <Route path='/admins' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<MangeUser />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
            <ToastContainer autoClose='3000' />
        </>
    )
}
export default Layout;