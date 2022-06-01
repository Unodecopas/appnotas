import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const Header = () => {
    const [user, setUser, logout] = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="App-header">
            <h1>Notes</h1>
            {user ? (
                <>
                    <p>{user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </header>
    );
};

export default Header;
