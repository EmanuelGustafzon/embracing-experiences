'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface PostInterface {
  _id: string;
  title: string;
  image: string;
  content: string;
  userEmail: string
}

const UserPostCard: React.FC = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/UserPost');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    try {
        await axios.delete(`/api/UserPost/${id}`)
    } catch (error) {
        console.error('Cant delete post:', error);
    }
  } 

  return (
    <>
    {posts.length > 0 ? ( posts.map((post) => {
        return (
          <div key={post._id} className="card w-96 glass m-2">
           {post.image && <figure><Image src={post.image} width={390} height={250} alt="car!" /></figure>}
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.content}</p>
              <div className="card-actions justify-end">
                <Link href={`/UserPost/${post._id}`} className="btn btn-primary">learn</Link>
              </div>
              {session?.user?.email === post.userEmail &&
                <div>
                    <button onClick={() => deletePost(post._id)}>delete</button> 
                    <span>update</span>
                </div>
              }

            </div>
          </div>
        );
      })
      ) : (
      <div className='grid grid-cols-2 gap-4 place-content-center h-48 '>
      <span className="loading loading-ring loading-lg"></span>
      </div>     
      )}
    </>
  );
};

export default UserPostCard;