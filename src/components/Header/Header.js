import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from "react-i18next";
import { TbBrandReact } from "react-icons/tb";
const Header = () => {
    const { t } = useTranslation();
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate('/login')
    }
    const handleClickSignup = () => {
        navigate('/signup')
    }
    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);

        if (res && res.EC === 0) {
            dispatch(doLogOut());
            navigate('/login');
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">Hải Đăng</Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand'><TbBrandReact className='brand-icon' /> Hải Đăng</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'> {t('header.title1')}</NavLink>
                        <NavLink to='/users' className='nav-link'>{t('header.title2')}</NavLink>
                        <NavLink to='/admins' className='nav-link'>{t('header.title3')}</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button type='button' className='btn-login' onClick={() => { handleClickLogin() }}>
                                    {t('header.title4.login')}
                                </button>
                                <button type='button' className='btn-signup' onClick={() => { handleClickSignup() }}>
                                    {t('header.title4.signup')}
                                </button>
                            </>
                            :
                            <NavDropdown title={t('header.title6')} id="basic-nav-dropdown" align={'end'}>
                                <NavDropdown.Item> {t('header.title5.profile')}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogOut()} > {t('header.title5.logout')}</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;