import React, { useCallback, useEffect, useRef, useState } from "react";

const NoteForm = (props) => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const formRef = useRef();

    const getCategoriesList = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost:4000/category`, {
                method: "GET",
                "Content-Type": "application/json",
            });
            if (res.ok) {
                return await res.json();
            }
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect(() => {
        getCategoriesList().then((response) => {
            console.log(response);
            setCategoriesList(response);
        });
    }, [getCategoriesList]);

    useEffect(() => {
        if (props.selectedNote && categoriesList) {
            setTitle(props.selectedNote.title);
            setDescription(props.selectedNote.description);
            setCategory(
                categoriesList.find(
                    (categoryItem) =>
                        props.selectedNote.name === categoryItem.name
                ).id
            );
        }
        return () => {};
    }, [props.selectedNote, categoriesList]);

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
                {categoriesList.map((categoryItem) => {
                    return (
                        <option key={categoryItem.id} value={categoryItem.id}>
                            {categoryItem.name}
                        </option>
                    );
                })}
            </select>
            <input
                name="description"
                placeholder="Añade una descripcion"
                value={description}
                onChange={handleDescriptionChange}
            />
            <button type="submit">
                {props.selectedNote ? "Editar" : "Añadir"}
            </button>
        </form>
    );
};

export default NoteForm;
