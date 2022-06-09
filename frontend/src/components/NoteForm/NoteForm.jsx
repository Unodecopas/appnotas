import React, { useRef, useState } from "react";

const NoteForm = (props) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const formRef = useRef();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <form onSubmit={props.onSubmit} method="POST" ref={formRef}>
            <input
                name="title"
                placeholder="Añade un titulo"
                value={title}
                onChange={handleTitleChange}
            />
            <select
                name="category"
                placeholder="Selecciona una categoria"
                value={category}
                onChange={handleCategoryChange}
            >
                <option value="1">Node</option>
                <option value="2">React</option>
                <option value="3">MySql</option>
            </select>
            <input
                name="description"
                placeholder="Añade una descripcion"
                value={description}
                onChange={handleDescriptionChange}
            />
            <button type="submit">Añadir</button>
        </form>
    );
};

export default NoteForm;
