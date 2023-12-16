'use client'
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'
import dotenv from 'dotenv';
import CheckPermissions from '@/utils/Auth/CheckPermissions';
import NavBar from '../components/NavBar';
import NavCms from '../components/NavCms';
dotenv.config();

const ManageContent: React.FC = () => {
  const editorRef = useRef<any>(null);

  const getContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      saveHtmlInDataBase(content)
      console.log(content)
    }
  };
  const saveHtmlInDataBase = async (content: string) => {
    try {
      const response = await axios.post('/api/post/new', {content})
      alert(response.statusText)
    } catch (error) {
      alert(error)
      console.error('Error saving content:', error);
    }
  }
    return (
      <>
        <NavBar/>
        <div className='flex flex-wrap'>
          <NavCms/>
        </div>
        <div className='mt-5 mb-5'>
          <h2 className='mp-5 mp-5'>Write a blog post</h2>
        </div>
        <div className='mt-5 mb-5'>
          <p className='mp-5 mp-5'>This is an editor to write blogposts just start exporing and press the button save to get it published.</p>
        </div>
      <div className='mt-5 mb-5 z-5'>
      <Editor
        apiKey='5sjdjhqf7mt362cnaby3ixovygdanvvfrmz2ga421yb9ne9l'
        onInit={(_, editor) => editorRef.current = editor}
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight  | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
        }}
      initialValue="Write a blog post!"
    />
    <button className='btn' onClick={getContent}>Publish content</button>
      </div>
    </>
    );
}

export default CheckPermissions(ManageContent) 






