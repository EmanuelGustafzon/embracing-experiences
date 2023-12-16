'use client'
import Image from 'next/image';
import axios from 'axios'
import { useEffect, useState } from 'react'
import * as cheerio from 'cheerio';
import NavBar from '@/app/components/NavBar';

export default function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/${params.id}`);
        console.log(response.data)
        setPost(response.data.content);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [params.id]);

// Parse the HTML content using Cheerio
const $ = cheerio.load(post);

// Replace img tags with Next.js Image components
$('img').each(function (index) {
  const imgSrc = $(this).attr('src');
  const imgAlt = $(this).attr('alt') || '';
  const imgWidth = parseInt($(this).attr('width') || '700', 10);
  const imgHeight = parseInt($(this).attr('height') || '500', 10);

  // Create a string representation of the Next.js Image component
  const imageElement = `<Image key="${index}" src="/${imgSrc}" alt="${imgAlt}" width=${imgWidth} height=${imgHeight} />`;

  // Replace the img tag with the string representation of the Next.js Image component
  $(this).replaceWith(imageElement);
});

// Get the updated HTML content
const updatedContent = $.html();


  return (
    <>
    <NavBar/>
    <div className="flex justify-center">
      <div className='prose'>
        {post && <div dangerouslySetInnerHTML={{ __html: updatedContent }} />
          || 
          <div className='grid grid-cols-2 gap-4 place-content-center h-48 '>
            <span className="loading loading-ring loading-lg"></span>
          </div>}
        </div>
    </div>
    </>
  )
 
}



