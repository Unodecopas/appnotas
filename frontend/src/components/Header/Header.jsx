import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import "./Header.css";

const Header = () => {
    const [user, , logout] = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleSingUp = async () => {
        navigate("/register");
    };

    return (
        <header className="header-container">
            <Link to="/">
                <h1>HackNotes</h1>
            </Link>
            <div className="header-container__user-area">
                {user ? (
                    <>
                        <p>{user.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <button onClick={handleSingUp}>Sign Up</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
