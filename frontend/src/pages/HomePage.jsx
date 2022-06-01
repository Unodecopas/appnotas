import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [user] = useUser();

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await fetch(
                    `http://localhost:4000/users/${user.username}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
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
            {notes.map((note) => {
                return <li key={note.id}>{note.title}</li>;
            })}
        </section>
    );
};

export default HomePage;
