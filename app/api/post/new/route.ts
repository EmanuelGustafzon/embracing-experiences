import connectMongo from '@/utils/Datebase';
import Post from '@/models/Post';

export const POST = async (request: Request) => {
  if (request.method === 'POST') {
    const { content, question, options, map, isPublished } = await request.json();
    console.log(options)
    try {
      await connectMongo();
      const newPost = new Post({ content, question, options: options, map, isPublished: isPublished });
      await newPost.save();
      return new Response('Created post successfully', { status: 201 });
    } catch (error) {
      console.error('Error saving post:', error);
      return new Response('Failed to create a new post', { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
};



