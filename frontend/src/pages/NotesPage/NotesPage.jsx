import React, { useState, useEffect, useCallback, useRef } from "react";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useUser } from "../../context/userContext";
import "./notesPage.css";
const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
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
            .then(() => {
                getNotes();
            })
            .catch((error) => console.error(error.message));
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        if (user) {
            getNotes();
        }
    }, [user, getNotes]);

    return (
        <div className="notes-page">
            <section className="create-note-section">
                <NoteForm onSubmit={createNote}></NoteForm>
            </section>

            <section className="notes-list">
                <ul>
                    {notes.map((note) => {
                        return (
                            <li
                                key={note.id}
                                className={`note ${note.name}`}
                                onClick={() => setModalVisible(true)}
                            >
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

            <Modal visible={modalVisible} handleClose={closeModal}>
                <NoteForm onSubmit={createNote}></NoteForm>
            </Modal>
        </div>
    );
};

export default NotesPage;
