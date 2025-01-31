import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate()
    const handleSubmitLogin = async () => {
        let data = await postLogin(email, pass)
        console.log(data)
        if (data && data.EC === 0) {
            toast.success('Đăng nhập thành công!');
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error('Sai tài khoản hoặc mật khẩu!');
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
                        className='btn-submit'
                        onClick={() => { handleSubmitLogin() }}
                    >
                        Đăng Nhập
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