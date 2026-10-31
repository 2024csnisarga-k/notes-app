import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import NoteItem from "./components/NoteItem";

function App() {
  const { theme } = useContext(ThemeContext);

  const [noteText, setNoteText] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save notes in browser
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Update browser tab title
  useEffect(() => {
    document.title = `Notes (${notes.length})`;
  }, [notes.length]);

  // Add note
  const addNote = () => {
    if (noteText.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNoteText("");
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  };

  // Add note using Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNote();
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">

        <div className="header">
          <h1>📝 My Notes App</h1>
          <ThemeToggle />
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Write your note here..."
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="add-btn" onClick={addNote}>
            Add Note
          </button>
        </div>

        <h2>My Notes ({notes.length})</h2>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="empty-message">No notes yet.</p>
          ) : (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                deleteNote={deleteNote}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;