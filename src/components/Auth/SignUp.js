import { useState } from 'react';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from '../Header/Language';
import { useTranslation, Trans } from "react-i18next";
const SignUp = (props) => {
    const { t } = useTranslation();
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
            toast.error(t('signup.title1'))
            return;
        }

        if (!password) {
            toast.error(t('signup.title2'))
            return;
        }

        //submit apis
        let data = await postSignUp(email, password, username);
        if (data && data.EC === 0) {
            toast.success(t('signup.title3'));
            navigate('/login')
        }

        if (data && +data.EC !== 0) {
            toast.error(t('signup.title4'));
        }
    }
    return (
        <div className="signup-container">
            <div className='header'>
                <span> {t('signup.title5')}</span>
                <button onClick={() => navigate('/login')}>{t('signup.title6')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Hải Đăng
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('signup.title7')}
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
                    <label>{t('signup.title8')}(*)</label>
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
                    <label>{t('signup.title9')}</label>
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
                    >{t('signup.title10')}</button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigate('/') }}>
                        &#60;&#60; {t('signup.title11')}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignUp;