import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../img/Easy rail-logos_transparent.png";
import { faBars, faSleigh } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { React, useState } from "react";
ReactSession.setStoreType("sessionStorage");

const Navbar = () => {
    // const showMenu = () => {
    //     const elt = document.getElementsByClassName("nav-links");
    //     if (elt.style.display === "flex"){
    //         elt.style.display = "none"
    //     }
    //     else {
    //         elt.style.display = "flex"
    //     }
    // }
    const navigate = useNavigate();
    const logout = () => {
        ReactSession.set("logged", false);
        ReactSession.set("username", "");
        navigate("/");
    };

    const login = ReactSession.get("logged");
    console.log(ReactSession.get("username"));
    return (
        <div className="nav-bar">
            <div>
                <NavLink to="/" className="img-link">
                    <img src={img} alt="Logo" className="img-size" />
                </NavLink>
            </div>
            <FontAwesomeIcon icon={faBars} size="2x" className="nav-menu" />
            <div className="nav-links">
                <div>
                    <NavLink to="/trainenq" className="link">
                        Train Enquiry
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/contact" className="link">
                        Contact
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/" className="link">
                        Home
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/dashboard" className="link">
                        DashBoard
                    </NavLink>
                </div>
                {login == true ? (
                    <div>
                        <p className="link" onClick={logout}>
                            Logout
                        </p>
                    </div>
                ) : (
                    <>
                        <div>
                            <NavLink to="/login" className="link">
                                Login
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/signup" className="link">
                                SignUp
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
