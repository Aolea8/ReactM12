import React, { useState, useEffect, useContext } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";
import { UserContext } from "../../userContext";

const Header = () => {
    let { authToken, setAuthToken } =useContext(UserContext);
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    const handleLogout = () => {
        fetch('http//equip07.insjoaquimmir.cat/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: "Bearer " + authToken
            },
          })
            .then(response => {
              if (response.ok) {
                console.log('Sesión cerrada exitosamente');
              } else {
                console.error('Error al cerrar la sesión');
              }
            })
            .catch(error => {
              console.error('Error de red:', error);
            });
        
        console.log('Cerrar sesión del usuario');
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}
                    >
                        Peliculas
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        Series
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                    <li className="menuItem">
                        <i class="bi bi-person"
                        onClick={() => navigate("/LoginRegister")}
                        ></i>
                        <div class="submenu">
						<div class="submenu-items">
							<ul>
								<li><Link  to="/Favoritos">Favoritos</Link></li>
								<li><a onClick={handleLogout}>Log Out<i class="bi bi-box-arrow-right"></i></a></li>
							</ul>
						</div>
                        </div>
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Busca tu peli o serie favorita...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose className="x-blue"
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;