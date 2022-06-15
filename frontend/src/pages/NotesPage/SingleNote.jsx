import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./singleNote.css";

const SingleNote = () => {
  const { username, noteid } = useParams();
  const [note, setNote] = useState();
  useEffect(() => {
    const getNote = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/${username}/${noteid}`
      );
      if (res.ok) {
        const data = await res.json();
        setNote(data);
      }
    };
    getNote();
  }, [username, noteid]);
  return (
    <section className="single-note">
      {note && (
        <>
          <h2>Título</h2>
          <p>{note.title}</p>
          <h3>Descripción</h3>
          <p>{note.description}</p>
          <h3>Categoría</h3>
          <p>{note.category}</p>
        </>
      )}
    </section>
  );
};

export default SingleNote;
