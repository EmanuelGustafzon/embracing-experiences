'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface PostInterface {
  id: number;
  content: string;
}

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => {
        const $ = cheerio.load(post.content);
        const h1Content = $('h1').text();
        const pContent = $('p').first().text();
        const imgSrc = $('img').first().attr('src');
        const img = `/${imgSrc}`;

        return (
          <div key={post.id} className="card w-96 glass m-2">
            <figure><Image src={img} width={390} height={250} alt="car!" /></figure>
            <div className="card-body">
              <h2 className="card-title">{h1Content}</h2>
              <p>{pContent}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostCard;

