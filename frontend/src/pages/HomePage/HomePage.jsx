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
          <h1>
            <span className="Accesibles">Accesibles</span>
            <span className="Simples">Simples</span>
            <span className="Rapidas">Rápidas </span>
          </h1>
        </div>
      )}
    </>
  );
};

export default HomePage;
