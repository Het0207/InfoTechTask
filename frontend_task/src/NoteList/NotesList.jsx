import React from 'react';
import './NoteList.css'
import '../Glossary/glossary.css'

const NotesList = ({ notes, editNote, deleteNote, pinNote }) => {
  return (
    <div className="notes-list-container">
      <h2>All Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available. Add some notes!</p>
      ) : (
        notes.map((note, index) => (
          <div key={note.id} className={`note-item ${note.pinned ? 'pinned' : ''}`}>
            <h3>{note.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
            <button onClick={() => editNote(index)}>Edit</button>
            <button onClick={() => deleteNote(index)}>Delete</button>
            <button onClick={() => pinNote(index)}>{note.pinned ? 'Unpin' : 'Pin'}</button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
