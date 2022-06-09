import React, { useState, useEffect, useCallback, useRef } from "react";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useUser } from "../../context/userContext";
import { getCategoryColor } from "../../utils/utils";
import "./notesPage.css";
const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
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

    useEffect(() => {
        if (user) {
            getNotes();
        }
    }, [user, getNotes]);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleNoteClick = (selectedNote) => {
        setModalVisible(true);
        setSelectedNote(selectedNote);
    };

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
                                className="note"
                                style={{
                                    border: `2px solid var(${getCategoryColor(
                                        note.categoryId
                                    )})`,
                                }}
                                onClick={() => handleNoteClick(note)}
                            >
                                <h2>{note.title}</h2>
                                <p>{note.description}</p>
                                <button
                                    disabled
                                    style={{
                                        backgroundColor: `var(${getCategoryColor(
                                            note.categoryId
                                        )})`,
                                    }}
                                >
                                    {note.categoryName}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <Modal
                visible={modalVisible}
                handleClose={closeModal}
                borderColor={getCategoryColor(selectedNote?.categoryId)}
            >
                <NoteForm
                    onSubmit={createNote}
                    selectedNote={selectedNote}
                ></NoteForm>
            </Modal>
        </div>
    );
};

export default NotesPage;
