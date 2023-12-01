import connectMongo from '@/utils/Datebase';
import UserPost from '@/models/UserPost';

export const POST = async (request: Request) => {
  if (request.method === 'POST') {
    const { title, image, content, userEmail } = await request.json();
    try {
      await connectMongo();

      const newUserPost = new UserPost({ title, image, content, userEmail });
      console.log(newUserPost);
      await newUserPost.save();
      return new Response(JSON.stringify(newUserPost), { status: 201 });

    } catch (error) {
      console.error('Error saving post:', error);
      return new Response('Failed to create a new post', { status: 500 });
      
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
};