import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                El portal de peliculas y series más completo de todo el mundo y ahora renovado,
                encuentra  clasicos, estrenos de cine, los mas populares y mas!
                </div>
                <div className="socialIcons">
                    <span className="icon">
                    <a href="https://www.instagram.com/arnau_oleaa8/"><FaFacebookF /></a>
                    </span>
                    <span className="icon">
                    <a href="https://www.instagram.com/arnau_oleaa8/"><FaInstagram /></a>
                    </span>
                    <span className="icon">
                    <a href="https://www.instagram.com/arnau_oleaa8/"><FaTwitter /></a>
                    </span>
                    <span className="icon">
                        <a href="https://www.instagram.com/arnau_oleaa8/"><FaLinkedin /></a>
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;