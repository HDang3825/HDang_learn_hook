import React from "react";
import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const Home = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title">
                    {t('homepage.title1')}
                </div>
                <div className="content">
                    {t('homepage.title2')}
                </div>
                <div className="btn-click">
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')} type="button"> {t('homepage.title3.login1')}</button>
                        :
                        <button onClick={() => navigate('/users')} type="button">{t('homepage.title3.login2')}</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;