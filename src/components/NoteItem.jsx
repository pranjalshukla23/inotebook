import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

export const NoteItem = ({ note, updateNote, showAlert }) => {
  const notesContext = useContext(NoteContext);

  const { notes, editNote, deleteNote } = notesContext;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                showAlert("note deleted successfully", "success");
              }}
            />
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => updateNote(note)}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};