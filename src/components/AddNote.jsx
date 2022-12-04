import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

export const AddNote = ({ showAlert }) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const notesContext = useContext(NoteContext);

  const { addNote } = notesContext;

  const onChangeHandler = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });

    showAlert("note added successfully", "success");
  };
  return (
    <>
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={note.title}
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChangeHandler}
            minLength={5}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            value={note.description}
            id="description"
            name="description"
            onChange={onChangeHandler}
            minLength={5}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            value={note.tag}
            id="tag"
            name="tag"
            onChange={onChangeHandler}
            minLength={5}
            required={true}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={note.title.length < 5 || note.description.length < 5}
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </>
  );
};