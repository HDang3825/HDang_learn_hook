import React from "react";
import videoHomePage from '../../assets/video-homepage.mp4'
const Home = (props) => {
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
                    <button type="button">Get started</button>
                </div>
            </div>
        </div>
    )
}
export default Home;