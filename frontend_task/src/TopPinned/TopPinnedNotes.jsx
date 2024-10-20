import React from 'react';
import './TopPinnedNotes.css'; // Import the CSS for TopPinnedNotes

const TopPinnedNotes = ({ notes, editNote, pinNote }) => {
  const pinnedNotes = notes.filter(note => note.pinned);

  if (pinnedNotes.length === 0) {
    return null; // No pinned notes, don't display anything
  }

  return (
    <div className="pinned-notes" style={{borderColor:'white'}}>
      <h2>Pinned Notes</h2>
      {pinnedNotes.map((note, index) => (
        <div key={note.id} className="pinned-note-item">
          <h3>{note.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: note.content }} style={{ marginBottom: '10px' }} ></div>
          <button onClick={() => editNote(index)}>Edit</button>
          <button onClick={() => pinNote(index)}>
            {note.pinned ? 'Unpin' : 'Pin'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TopPinnedNotes;
