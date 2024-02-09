'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'
import dotenv from 'dotenv';
import CheckPermissions from '@/utils/Auth/CheckPermissions';
import NavBar from '@/app/components/NavBar';
import AddQuestion from '@/app/components/AddQuestion';
import NavCms from '@/app/components/NavCms';
dotenv.config();

interface Option {
  option: string;
  correct: boolean;
}

const EditPost = ({ params }: { params: { id: string } }) => {
  const [content, setContent] = useState('')
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/post/${params.id}`);
        setContent(response.data.content)
        setQuestion(response.data.question);
        setOptions(response.data.options);
        setMap(response.data.map);
        setIsPublished(response.data.isPublished);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [params.id, content]);

  const handleCheckboxChange = () => {
    setIsPublished(!isPublished);
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
  const getContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      return content;
    }
  };
  const saveHtmlInDataBase = async (content: string, question: string, options: Option[], map: string, isPublished: boolean) => {
    try {
      console.log(options)
      const response = await axios.put(`/api/post/${params.id}`, {content, question, options, map, isPublished})
      alert(response.statusText)
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
          <h2 className='text-4xl font-bold mb-5'>Update this blog post</h2>
        </div>

        <div className='mt-5 mb-5 flex justify-center'>
          <p className='text-lg mb-5'>
          Update a blogpost, make shure to have one heading 1.
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
            initialValue={content}
          />
          <AddQuestion currentQuestion={question} currentOptions={options} submitFunction={addQuestion} />
        </div>

        <div className='mb-5 flex justify-center'>
          <input
            type='text'
            value={map}
            onChange={addMap}
            placeholder='Add iframe for map location'
            className='p-2 border rounded'
          />
        </div>

        <label className='flex justify-center'>
          <input type='checkbox' checked={isPublished} onChange={handleCheckboxChange} className='mr-2' />
          Publish
        </label>

        <div className='mt-5 flex justify-center'>
          <button className='btn' onClick={() => saveHtmlInDataBase(getContent(), question, options, map, isPublished)}>
            Save Changes
          </button>
        </div>
      </>
    );
}

export default CheckPermissions(EditPost)