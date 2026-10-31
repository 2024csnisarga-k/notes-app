import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function NoteItem({ note, deleteNote }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`note-item ${theme}`}>
      <span>{note.text}</span>

      <button
        className="delete-btn"
        onClick={() => deleteNote(note.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;