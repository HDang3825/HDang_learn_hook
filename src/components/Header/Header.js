import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate('/login')
    }
    const handleClickSignup = () => {
        navigate('/signup')
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
                        <button type='button' className='btn-login' onClick={() => { handleClickLogin() }}>
                            Đăng Nhập
                        </button>
                        <button type='button' className='btn-signup' onClick={() => { handleClickSignup() }}>
                            Đăng Kí
                        </button>
                        {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item >Log In</NavDropdown.Item>
                            <NavDropdown.Item >Log Out</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;