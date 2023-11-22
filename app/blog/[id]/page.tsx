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

  const $ = cheerio.load(post);
  const content = $.html()
 

  return (
    <>
    <NavBar/>
    <div className="flex justify-center">
      <div className='prose'>
        {post && <div dangerouslySetInnerHTML={{ __html: content }} />
          || 
          <div className='grid grid-cols-2 gap-4 place-content-center h-48 '>
            <span className="loading loading-ring loading-lg"></span>
          </div>}
        </div>
    </div>
    </>
  )
 
}



