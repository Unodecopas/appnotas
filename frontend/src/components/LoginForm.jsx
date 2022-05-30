import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useUser();
  if (user) return <Navigate to="/" />;
  return (
    <section className="form-control">
      <form>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <Link to="/register">¿No estás registrado?¡Regístrate!</Link>
    </section>
  );
};

export default LoginForm;
