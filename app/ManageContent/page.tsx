'use client'
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'

const ManageContent: React.FC = () => {
  const editorRef = useRef<any>(null);
  const saveContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      saveHtmlInDataBase(content)
      console.log(content)
    }
  };
  const saveHtmlInDataBase = async (content: string) => {
    try {
      const response = await axios.post('/api/post/new', {content})
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
    return (
      <div>
      <Editor
        apiKey='5sjdjhqf7mt362cnaby3ixovygdanvvfrmz2ga421yb9ne9l'
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
      }}
      initialValue="Welcome to TinyMCE!"
    />
    <button onClick={saveContent}>Save content</button>
      </div>
    );
}

export default ManageContent






