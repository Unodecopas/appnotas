import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "../../context/userContext";
import "./notesPage.css";
const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [user] = useUser();

    const getNotes = useCallback(async () => {
        try {
            const res = await fetch(
                `http://localhost:4000/users/${user.username}`,
                {
                    method: "GET",
                    "Content-Type": "application/json",
                    headers: {
                        Authorization: user.token,
                    },
                }
            );
            if (res.ok) {
                const data = await res.json();

                setNotes(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [user]);

    const createNote = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        await fetch(`http://localhost:4000/users/${user.username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
            body: JSON.stringify(Object.fromEntries(data)),
        })
            .then(() => getNotes())
            .catch((error) => console.error(error.message));
    };

    useEffect(() => {
        if (user) {
            getNotes();
        }
    }, [user, getNotes]);

    return (
        <div className="notes-page">
            <section className="create-note-section">
                <form onSubmit={createNote} method="POST">
                    <input name="title" placeholder="Añade un titulo" />
                    <select
                        name="category"
                        placeholder="Selecciona una categoria"
                    >
                        <option value="1">Node</option>
                        <option value="2">React</option>
                        <option value="3">MySql</option>
                    </select>
                    <input
                        name="description"
                        placeholder="Añade una descripcion"
                    />
                    <button type="submit">Añadir</button>
                </form>
            </section>

            <section className="notes-list">
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
        </div>
    );
};

export default NotesPage;
