import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import "./LoginForm.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useUser();

    if (user) return <Navigate to="/" />;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setUser(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section>
            <form className="form-control" onSubmit={handleLogin}>
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
