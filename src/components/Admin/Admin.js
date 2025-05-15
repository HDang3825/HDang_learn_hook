import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import PerfectScrollBar from 'react-perfect-scrollbar'
import Language from '../Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from "react-i18next";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <NavDropdown title={t('header.title6')} id="basic-nav-dropdown" align={'end'}>
                            <NavDropdown.Item> {t('header.title5.profile')}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item > {t('header.title5.logout')}</NavDropdown.Item>
                        </NavDropdown>

                        <Language />
                    </div>

                </div>
                <div className="admin-main">
                    <PerfectScrollBar>
                        <Outlet />
                    </PerfectScrollBar>
                </div>
            </div>
        </div>
    )
}
export default Admin;