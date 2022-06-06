import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import "./notesPage.css";
const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [user] = useUser();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/users/${user.username}`,
          {
            "Content-Type": "application/json",
            headers: {
              Authorization: user.token,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setNotes(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (user) {
      getNotes();
    }
  }, [user]);

  return (
    <section className="notes-page">
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id} className={`note ${note.name}`}>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <button disabled className={note.name}>
                {note.name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NotesPage;
