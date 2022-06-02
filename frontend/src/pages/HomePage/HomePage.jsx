import React from "react";
import { useUser } from "../../context/userContext";
import NotesPage from "../NotesPage/NotesPage";
import "./HomePage.css";

const HomePage = () => {
    const [user] = useUser();
    return (
        <>
            {user ? (
                <NotesPage />
            ) : (
                <div className="home-page">
                    <h1>Welcome</h1>
                </div>
            )}
        </>
    );
};

export default HomePage;
