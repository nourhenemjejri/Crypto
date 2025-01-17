import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import securityImage from "../image/5.avif";


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img src={securityImage} alt="Security" className="security-image" />
            <h1 className="home-title"></h1>
            <div className="button-group">
                <button 
                    className="action-button" 
                    onClick={() => navigate("./cryptage")}
                >
                    Cryptage
                </button>
                <button 
                    className="action-button" 
                    onClick={() => navigate("./decrypter")}
                >
                    Décryptage
                </button>
            </div>
        </div>
    );
};

export default Home;
