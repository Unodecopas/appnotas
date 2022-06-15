import React, { useState, useEffect, useCallback } from "react";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useUser } from "../../context/userContext";
import { getCategoryColor } from "../../utils/utils";
import { ReactComponent as TrashcanIcon } from "../../assets/trashcan.svg";
import { ReactComponent as PublicIcon } from "../../assets/eye.svg";
import { ReactComponent as PrivateIcon } from "../../assets/closedEye.svg";
import "./notesPage.css";
const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [user] = useUser();

  const getNotes = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/${user.username}`,
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

    await fetch(`${process.env.REACT_APP_BACKEND}/users/${user.username}`, {
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

  const deleteNote = async (noteId) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND}/users/${user.username}/${noteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      }
    )
      .then(() => {
        getNotes();
      })
      .catch((error) => console.error(error.message));
  };
  const updateNote = async (e, noteId) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await fetch(
      `${process.env.REACT_APP_BACKEND}/users/${user.username}/${noteId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(Object.fromEntries(data)),
      }
    )
      .then(() => {
        getNotes();
      })
      .catch((error) => console.error(error.message));
    closeModal();
  };

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, getNotes]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleNoteClick = (selectedNote) => {
    setModalVisible(true);
    setSelectedNote(selectedNote);
  };

  const handleDeleteButton = (e, noteId) => {
    e.stopPropagation();
    deleteNote(noteId);
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
                  border: `2px solid var(${getCategoryColor(note.categoryId)})`,
                }}
                onClick={() => handleNoteClick(note)}
              >
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <section className="buttons-section">
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
                  <div className="options-section">
                    <button className="public-icon">
                      {note.public ? <PublicIcon /> : <PrivateIcon />}
                    </button>

                    <button
                      className="delete-button"
                      onClick={(e) => handleDeleteButton(e, note.id)}
                    >
                      <TrashcanIcon />
                    </button>
                  </div>
                </section>
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
          onSubmit={(e) => updateNote(e, selectedNote?.id)}
          selectedNote={selectedNote}
        ></NoteForm>
      </Modal>
    </div>
  );
};

export default NotesPage;
