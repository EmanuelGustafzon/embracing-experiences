'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'
import dotenv from 'dotenv';
import CheckPermissions from '@/utils/Auth/CheckPermissions';
import NavBar from '../components/NavBar';
import NavCms from '../components/NavCms';
import AddQuestion from '../components/AddQuestion';
dotenv.config();

interface Option {
  option: string;
  correct: boolean;
}

const ManageContent: React.FC = () => {

  const editorRef = useRef<any>(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<Option[]>([
      {option: '', correct: false},
      {option: '', correct: false},
      {option: '', correct: false},
      {option: '', correct: false},
  ]);
  const [map, setMap] = useState('')
  const [isPublished, setIsPublished] = useState(false);

  const handleCheckboxChange = () => {
    setIsPublished(!isPublished);
  };

  const getContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      return content;
    }
  };
  const addQuestion = (questionFromForm: string, optionsFromForm: Option[]) => {
    setQuestion(questionFromForm)
    const updatedOptions = [...options]
    optionsFromForm.map((option, index) => {
      updatedOptions[index] = option
    })
    setOptions(updatedOptions)
  }
  const addMap = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setMap(e.target.value);
  }
  
  const saveHtmlInDataBase = async (content: string, question: string, options: Option[], map: string, published: boolean) => {
    console.log(content, question, options, map, published)
    try {
      const response = await axios.post('/api/post/new', {content, question, options, map, isPublished})
      alert('yeaah')
    } catch (error) {
      alert(error)
      console.error('Error saving content:', error);
    }
  }
    return (
        <>
          <NavBar />
          <div className='mt-5 mb-5 flex justify-center'>
            <NavCms />
          </div>

          <div className='mt-5 mb-5 flex justify-center'>
            <h2 className='text-3xl font-bold mb-3'>Write a Blog Post</h2>
          </div>


          <div className='mt-5 mb-5 flex justify-center'>
            <p className='text-lg mb-5'>
              Create a blogpost, make shure to have one heading 1.
            </p>
          </div>

          <div className='mt-5 mb-5 z-5'>
            <Editor
              apiKey='5sjdjhqf7mt362cnaby3ixovygdanvvfrmz2ga421yb9ne9l'
              onInit={(_, editor) => (editorRef.current = editor)}
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar:
                  'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight  | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
              }}
              initialValue='Write a blog post!'
            />

            <div className='mt-5'>
              <AddQuestion currentQuestion={question} currentOptions={options} submitFunction={addQuestion} />
            </div>

            <div className='mt-5 flex justify-center'>
              <input type='text' onChange={addMap} placeholder='Add iframe for map location' className='p-2 border rounded' />
            </div>

            <label className='flex justify-center mt-5'>
              <input type='checkbox' checked={isPublished} onChange={handleCheckboxChange} className='mr-2' />
              Publish
            </label>

            <div className='mt-5 flex justify-center'>
              <button className='btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => saveHtmlInDataBase(getContent(), question, options, map, isPublished)}>
                Save Changes
              </button>
            </div>
          </div>
        </>
    );
}

export default CheckPermissions(ManageContent) 






