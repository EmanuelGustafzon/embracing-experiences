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
    }, []);

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
        <NavCms/>
        <div className='flex justify-center '>
            <h2 className='mb-5 mt-5 text-3xl font-bold'>
                Manage Blog Posts
            </h2>
        </div>
        <div className="flex justify-center">
        {posts.length > 0 ? ( posts.map((post) => {
          const $ = cheerio.load(post.content);
          const h1Content = $('h1').text();
          return (
            <div key={post._id} className="card w-96 bg-neutral text-neutral-content">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{h1Content}</h2>
                <div className="card-actions justify-end">
                  <Link href={`/manage-content/edit-post/${post._id}`} className="btn btn-primary">Edit</Link>
                  <button onClick={() => deletePost(post._id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          );
        })
        ) : (
        <div className='grid grid-cols-2 gap-4 place-content-center h-48 '>
        <span className="loading loading-ring loading-lg"></span>
        </div>     
        )}
    </div>
    </div>
  )
}

export default EditPosts

