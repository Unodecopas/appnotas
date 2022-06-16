import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [user] = useUser();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, name, lastname }),
      });
      if (res.ok) {
        await res.json();
        navigate("/login");
      } else {
        const err = await res.json();
        setError(err.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="form">
      {error && <span>{error}</span>}
      <form onSubmit={handleRegister} className="form-control">
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
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <button>Registro</button>
      </form>
      <Link to="/login">¿Ya registrado? Inicia sesión</Link>
    </section>
  );
};

export default RegisterForm;
