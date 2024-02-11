'use client'
import React, { useEffect, useState } from 'react'
import NavBar from '@/app/components/NavBar'
import NavCms from '@/app/components/NavCms';
import axios from 'axios';
import * as cheerio from 'cheerio';
import Link from 'next/link';


interface PostInterface {
    _id: string;
    content: string;
  }

const EditPosts: React.FC = () => {
    const [posts, setPosts] = useState<PostInterface[]>([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get('/api/post',);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      fetchPosts();
    }, [posts]);

    const deletePost = async (id: string) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      
      if (confirmDelete) {
        try {
          const response = await axios.delete(`/api/post/${id}/`);
          console.log(response.data)
          alert(response.statusText);
        } catch (error) {
          alert('Could not delete post');
          console.error('Error deleting post:', error);
        }
      }
    };
    
  return (
    <div>
        <NavBar/>
        <div className='mt-5 mb-5 flex justify-center'>
          <NavCms />
        </div>
        <div className='flex justify-center '>
            <h2 className='mb-5 mt-5 text-3xl font-bold'>
                Manage Blog Posts
            </h2>
        </div>
        <div className='flex justify-center'>
        <ul className=" rounded">
        {posts.length > 0 ? ( posts.map((post) => {
          const $ = cheerio.load(post.content);
          const h1Content = $('h1').text();
          return (
            <li key={post._id} className='bg-primary rounded m-5 p-3'>
                <div className='flex flex-wrap' style={{ justifyContent: 'space-between' }}>
                  <h2 className="card-title">{h1Content}</h2>
                  <div>
                    <Link href={`/manage-content/edit-post/${post._id}`} className="btn">Edit</Link>
                    <button onClick={() => deletePost(post._id)} className="btn btn-error">Delete</button>
                  </div>
                </div>
            </li>
          );
        })
        ) : (
        <div className='grid grid-cols-2 gap-4 place-content-center h-48 '>
        <span className="loading loading-ring loading-lg"></span>
        </div>     
        )}
    </ul>
    </div>
    </div>
  )
}

export default EditPosts

