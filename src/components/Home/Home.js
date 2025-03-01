import React from "react";
import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title">
                    There's a best the way to ask
                </div>
                <div className="content">
                    You don't want to make a boring form. And your audience won't answer one.
                    Create a typeform instead-and make everyone happy.
                </div>
                <div className="btn-click">
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')} type="button">Bắt đầu ngay</button>
                        :
                        <button onClick={() => navigate('/users')} type="button">Làm bài ngay</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;