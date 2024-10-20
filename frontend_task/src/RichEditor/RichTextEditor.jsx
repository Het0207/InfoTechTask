import React, { useRef, useState, useEffect } from 'react';
import './RichTextEditor.css'
const RichTextEditor = ({ onContentChange, content, reset }) => {
  const editorRef = useRef(null);

  // State to track which formatting options are active
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
  });

  // Function to apply formatting using execCommand
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    updateActiveFormats();
  };

  // Function to check which formats are currently active
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
    });
  };

  const handleInput = () => {
    const content = editorRef.current.innerHTML;
    onContentChange(content);
  };

  const setCursorToEnd = () => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(editorRef.current);
    range.collapse(false); // Collapse to the end
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // Reset the formatting when `reset` prop changes
  useEffect(() => {
    if (reset) {
      document.execCommand('removeFormat'); // Clear formatting
      setActiveFormats({
        bold: false,
        italic: false,
        underline: false,
        justifyLeft: false,
        justifyCenter: false,
        justifyRight: false,
      });
    }
  }, [reset]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
      setCursorToEnd(); // Move the cursor to the end when content updates
    }
  }, [content]);

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveFormats);
    return () => {
      document.removeEventListener('selectionchange', updateActiveFormats);
    };
  }, []);

  return (
    <div>
      {/* Toolbar for formatting */}
      <div className="toolbar">
        <button
          className={activeFormats.bold ? 'active' : ''}
          onClick={() => applyFormat('bold')}
        >
          Bold
        </button>
        <button
          className={activeFormats.italic ? 'active' : ''}
          onClick={() => applyFormat('italic')}
        >
          Italic
        </button>
        <button
          className={activeFormats.underline ? 'active' : ''}
          onClick={() => applyFormat('underline')}
        >
          Underline
        </button>
        <button
          className={activeFormats.justifyLeft ? 'active' : ''}
          onClick={() => applyFormat('justifyLeft')}
        >
          Left Align
        </button>
        <button
          className={activeFormats.justifyCenter ? 'active' : ''}
          onClick={() => applyFormat('justifyCenter')}
        >
          Center Align
        </button>
        <button
          className={activeFormats.justifyRight ? 'active' : ''}
          onClick={() => applyFormat('justifyRight')}
        >
          Right Align
        </button>
      </div>

      {/* Content Editable div for text input */}
      <div
        className="editor"
        contentEditable
        ref={editorRef}
        onInput={handleInput}
        style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px' }}
      ></div>
    </div>
  );
};

export default RichTextEditor;
