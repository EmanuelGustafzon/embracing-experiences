import connectMongo from '@/utils/Datebase';
import Post from '@/models/Post';

export const POST = async (request: Request) => {
  if (request.method === 'POST') {
    const { content } = await request.json();
    try {
      await connectMongo();

      const newPost = new Post({ content });
      console.log(newPost);
      await newPost.save();
      return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
      console.error('Error saving post:', error);
      return new Response('Failed to create a new post', { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
};



