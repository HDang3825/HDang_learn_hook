import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitLogin = async () => {
        let isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('Email không hợp lệ!');
            return;
        }
        if (!pass) {
            toast.error('Password không hợp lệ!');
            return;
        }
        setIsLoading(true);
        let data = await postLogin(email, pass)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success('Đăng nhập thành công!');
            setIsLoading(false);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error('Sai tài khoản hoặc mật khẩu!');
            setIsLoading(false);
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>Bạn chưa có tài khoản?</span>
                <button onClick={() => navigate('/signup')}>Đăng Kí</button>
            </div>
            <div className="title col-4 mx-auto">
                Hải Đăng
            </div>
            <div className="welcome col-4 mx-auto">
                Xin chào, Bạn là?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Mật Khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={(event) => { setPass(event.target.value) }}
                    />
                </div>
                <span className='forgot-pass text-decoration-underline text-muted'> Quên mật khẩu?</span>
                <div>
                    <button
                        type='submit'
                        className='btn-submit'
                        onClick={() => { handleSubmitLogin() }}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner9 className='loader-icons' />}
                        <span>Đăng Nhập</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='btn border-0' onClick={() => { navigate('/') }}> &lt;&lt; Trở về Trang Chủ</span >
                </div>
            </div>
        </div>
    )
}
export default Login