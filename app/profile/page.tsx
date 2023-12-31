'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';

interface postTypes {
    image: 'string';
    title: 'string';
    content: 'string'
    _id: 'string';

}
const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [profilePosts, setProfilePosts] = useState<postTypes[]>();

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('/api/UserPost', {
              params: {userEmail: session?.user?.email}
            })
            setProfilePosts(response.data)
          } catch(error) {
            console.error('Error fetching posts:', error);
          } 
        }
        fetchPosts();
    }, [session])

  return (
    <div>
      <div className='flex justify-center '>
        <h2 className='mb-5 mt-5 text-3xl font-bold'>
        {session?.user?.name}
        </h2>
      </div>
      <h2>Welcome </h2>
      <div><Link href="/profile/newPost" /></div>
      <div>
          <h3>Browse Your Posts</h3>
          <hr />
          {profilePosts?.map(post => {
            return (
              <div key={post._id} className="card w-96 glass m-2">
              {post.image && <figure><Image src={post.image} width={390} height={250} alt="car!" /></figure>}
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default ProfilePage