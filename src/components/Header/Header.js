import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
const Header = () => {
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
                <NavLink to='/' className='navbar-brand'>Hải Đăng</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Trang Chủ</NavLink>
                        <NavLink to='/users' className='nav-link'>Người Dùng</NavLink>
                        <NavLink to='/admins' className='nav-link'>Quản Trị</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button type='button' className='btn-login' onClick={() => { handleClickLogin() }}>
                                    Đăng Nhập
                                </button>
                                <button type='button' className='btn-signup' onClick={() => { handleClickSignup() }}>
                                    Đăng Kí
                                </button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown" align={'end'}>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogOut()} >Log Out</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;