import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";

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
        <section>
            <h1>Notas</h1>
            {notes.map((note) => {
                return <li key={note.id}>{note.title}</li>;
            })}
        </section>
    );
};

export default NotesPage;
