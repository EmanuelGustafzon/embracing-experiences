'use client'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

const ManageContent: React.FC = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (content: string) => {
      setContent(content);
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          await axios.post('/api/post/new', { content });
        } catch (error) {
          console.error('Error saving content:', error);
        }
      };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="editor-container">
          <ReactQuill 
          value={content} 
          onChange={handleContentChange} 
          modules={{
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered'}, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link', 'image', 'video'],
                    ['clean']
                ]
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              },
          }}
          />
        </div>
        <button type="submit">Save Post</button>
      </form>
    );
}

export default ManageContent