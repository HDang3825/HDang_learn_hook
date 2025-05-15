import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";
import Language from '../Header/Language';
import { useTranslation, Trans } from "react-i18next";
const Login = (props) => {
    const { t } = useTranslation();
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
            toast.error(t('login.title1'));
            return;
        }
        if (!pass) {
            toast.error(t('login.title2'));
            return;
        }
        setIsLoading(true);
        let data = await postLogin(email, pass)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(t('login.title3'));
            setIsLoading(false);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(t('login.title4'));
            setIsLoading(false);
        }
    }
    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleSubmitLogin();
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>{t('login.title5')}</span>
                <button onClick={() => navigate('/signup')}>{t('login.title6')}</button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                Hải Đăng
            </div>
            <div className="welcome col-4 mx-auto">
                {t('login.title7')}
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
                    <label>{t('login.title8')}</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={(event) => { setPass(event.target.value) }}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                <span className='forgot-pass text-decoration-underline text-muted'>{t('login.title9')}</span>
                <div>
                    <button
                        type='submit'
                        className='btn-submit'
                        onClick={() => { handleSubmitLogin() }}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner9 className='loader-icons' />}
                        <span>{t('login.title10')}</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='btn border-0' onClick={() => { navigate('/') }}> &lt;&lt; {t('login.title11')}</span >
                </div>
            </div>
        </div>
    )
}
export default Login