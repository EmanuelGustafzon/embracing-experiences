'use client'
import Image from 'next/image';
import axios from 'axios'
import { useEffect, useState } from 'react'
import * as cheerio from 'cheerio';
import NavBar from '@/app/components/NavBar';

interface Option {
  option: string;
  correct: boolean;
}

export default function Page({ params }: { params: { id: string } }) {
  const [content, setContent] = useState('')
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<Option[]>([
      {option: '', correct: false},
      {option: '', correct: false},
      {option: '', correct: false},
      {option: '', correct: false},
  ]);
  const [map, setMap] = useState('')
  const [selected, setSelected] = useState([false, false, false, false])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/${params.id}`);
        setContent(response.data.content);
        setQuestion(response.data.question);
        setOptions(response.data.options);
        setMap(response.data.map);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [params.id]);

  // Parse the HTML content using Cheerio
  const $ = cheerio.load(content);

  // Replace img tags with Next.js Image components
  $('img').each(function (index) {
    const imgSrc = $(this).attr('src');
    const imgAlt = $(this).attr('alt') || '';
    const imgWidth = parseInt($(this).attr('width') || '700', 10);
    const imgHeight = parseInt($(this).attr('height') || '500', 10);

    // Create a string representation of the Next.js Image component
    const imageElement = `<Image key="${index}" src="${imgSrc}" alt="${imgAlt}" width=${imgWidth} height=${imgHeight} />`;

    // Replace the img tag with the string representation of the Next.js Image component
    $(this).replaceWith(imageElement);
  });

  // Get the updated HTML content
  const updatedContent = $.html();

  const checkAnswer = (index: number) => {
    setSelected(prev => {
      const updatedSelected = [...prev]; 
      updatedSelected[index] = true;
      return updatedSelected; 
    })
  }
  return (
<>
  <NavBar />
  <div className="mt-5 flex justify-center">
    <div className='prose'>
      {content ? (
        <div>
          <div className='m-2' dangerouslySetInnerHTML={{ __html: updatedContent }} />
          <h3 className="mt-5">Quiz Question:</h3>
          <div className="rounded-lg shadow-md p-4">
            <p>{question}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button onClick={() => checkAnswer(1)} className={`btn ${selected[1] ? options[1].correct ? 'bg-success' : 'bg-error' : ''} `}>{options[1].option}</button>
            <button onClick={() => checkAnswer(2)} className={`btn ${selected[2] ? options[2].correct ? 'bg-success' : 'bg-error' : ''} `}>{options[2].option}</button>
            <button onClick={() => checkAnswer(0)} className={`btn ${selected[0] ? options[0].correct ? 'bg-success' : 'bg-error' : ''} `}>{options[0].option}</button>
            <button onClick={() => checkAnswer(3)} className={`btn ${selected[3] ? options[3].correct ? 'bg-success' : 'bg-error' : ''} `}>{options[3].option}</button>
          </div>
          {map && (
            <div>
              <h3 className="mt-5">Find location here</h3>
              <iframe src={map} width="100%" height="auto" loading="lazy"></iframe>
            </div>
          )}
          <div className='flex justify-center'>
            <p>Thanks for reading</p>
            </div>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4 place-content-center h-48'>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  </div>
</>





  )
}



