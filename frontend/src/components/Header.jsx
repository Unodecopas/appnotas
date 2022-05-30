import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

const Header = () => {
  const [user] = useUser();
  return (
    <header className="App-header">
      <h1>Notes</h1>
      {user ? <p>{user.username}</p> : <Link to="/login">Login</Link>}
    </header>
  );
};

export default Header;
