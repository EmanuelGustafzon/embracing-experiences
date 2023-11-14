import connectMongo from '@/utils/Datebase';
import Post from '@/models/Post';

export const GET = async (request: Request) => {
    try {
      await connectMongo();

      const allPosts = await Post.find()
      return new Response(JSON.stringify(allPosts), { status: 200 });
    } catch (error) {
      console.error('There is no posts:', error);
      return new Response('There is no posts', { status: 404 });
    }
};
