import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom';
const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={'00bfff'} />
                        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Hai Dang</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        >
                            Dashboard
                            <Link to='/admins' />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem>
                                Quản lí Users
                                <Link to='/admins/manage-user' />
                            </MenuItem>
                            <MenuItem>
                                Quản lí bài Quiz
                                <Link to='/admins/manage-quiz' />
                            </MenuItem>
                            <MenuItem>
                                Quản lí câu hỏi
                                <Link to='/admins/manage-questions' />
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/volehaidangfanCr7"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <MdDashboard />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Hải Đăng
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;