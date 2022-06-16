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
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <button className="register" onClick={handleSingUp}>
              Registro
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
