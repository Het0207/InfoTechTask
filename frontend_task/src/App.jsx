import React, { useState } from 'react';
import TopPinnedNotes from './TopPinned/TopPinnedNotes';
import NotesList from './NoteList/NotesList';
import './App.css';
import RichTextEditor from './RichEditor/RichTextEditor';
import { glossary } from './Glossary/glossary'; 
import './Glossary/glossary.css'
const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [currentNote, setCurrentNote] = useState({ id: Date.now(), title: '', content: '' });
  const [resetFormats, setResetFormats] = useState(false);
  const [showNotes, setShowNotes] = useState(false); 

  const highlightGlossaryTerms = (content) => {
    let highlightedContent = content;
    for (const [term, explanation] of Object.entries(glossary)) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(
        regex,
        `<span class="glossary-term" data-explanation="${explanation}">${term}</span>`
      );
    }
    return highlightedContent;
  };

  const addNote = () => {
    if (currentNote.title.trim() && currentNote.content.trim()) {
      const newNote = { 
        ...currentNote, 
        pinned: false, 
        content: highlightGlossaryTerms(currentNote.content)
      };
      setNotes([newNote, ...notes]);
      resetCurrentNote(true);
    }
  };

  const resetCurrentNote = (isNewNote = false) => {
    setCurrentNote({ id: Date.now(), title: '', content: '' });
    setCurrentNoteIndex(null);
    setResetFormats(!resetFormats);
  };

  const handleContentChange = (content) => {
    setCurrentNote({ ...currentNote, content });
  };

  const editNote = (index) => {
    const noteToEdit = notes[index];
    setCurrentNote(noteToEdit);
    setCurrentNoteIndex(index);
    setResetFormats(false);
    setShowNotes(false); // Switch back to editor mode on edit
  };

  const saveNote = () => {
    if (currentNoteIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === currentNoteIndex ? { 
          ...currentNote, 
          content: highlightGlossaryTerms(currentNote.content)
        } : note
      );
      setNotes(updatedNotes);
    } else {
      addNote();
    }
    resetCurrentNote();
  };

  const pinNote = (index) => {
    const updatedNotes = notes.map((note, i) => ({
      ...note,
      pinned: i === index ? !note.pinned : note.pinned,
    }));
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <center>
      <h1 style={{backgroundColor:'#222', color:'white', marginBottom:'15px', padding:'10px'}}>Notes App</h1>
      </center>
      <div className="toggle-view">
        <button onClick={() => {setShowNotes(!showNotes); console.log(showNotes);
        }} className="view-notes-btn">
          {showNotes ? 'Go to Editor' : 'View Notes'}
        </button>
      </div>

      {!showNotes ? (
        <div className="editor-container">
          <div className="toolbar">
            <button onClick={saveNote} className="add-note-btn">
              {currentNoteIndex !== null ? 'Save Note' : 'Add Note'}
            </button>
          </div>

          <div className="editing-area">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              placeholder="Note Title"
              className="title-input"
            />
            <RichTextEditor 
              onContentChange={handleContentChange} 
              content={currentNote.content} 
              reset={resetFormats} 
            />
          </div>
        </div>
      ) : (
        <NotesList 
          notes={notes} 
          editNote={editNote} 
          deleteNote={deleteNote} 
          pinNote={pinNote}
        />
      )}
      
      <TopPinnedNotes notes={notes} editNote={editNote} pinNote={pinNote} />
    </div>
  );
};

export default App;
