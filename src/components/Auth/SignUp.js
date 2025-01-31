import { useState } from 'react';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSignUp = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Không được để trống Email!')
            return;
        }

        if (!password) {
            toast.error('Không được để trống Mật khẩu!')
            return;
        }

        //submit apis
        let data = await postSignUp(email, password, username);
        if (data && data.EC === 0) {
            toast.success("Đăng kí thành công!");
            navigate('/login')
        }

        if (data && +data.EC !== 0) {
            toast.error("Xảy ra lỗi, vui lòng thử lại!");
        }
    }
    return (
        <div className="signup-container">
            <div className='header'>
                <span> Bạn đã có tài khoản?</span>
                <button onClick={() => navigate('/login')}>Đăng Nhập</button>
            </div>
            <div className='title col-4 mx-auto'>
                Hải Đăng
            </div>
            <div className='welcome col-4 mx-auto'>
                Bắt đầu trải nghiệm của bạn?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Mật Khẩu(*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className='form-group'>
                    <label>Tên tài khoản</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleSignUp()}
                    >Tạo tài khoản</button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigate('/') }}>
                        &#60;&#60; Trở về Trang Chủ
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignUp;