import connectMongo from '@/utils/Datebase';
import Post from '@/models/Post';

// GET ID METHOD
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const postId = params.id 
    try {
        await connectMongo();
        const post = await Post.findById(postId)
        
        if (!post) return new Response("Post Not Found", { status: 404 });
        return new Response(JSON.stringify(post), { status: 200 });

      } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
      }
  }

// PUT method
export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  if (request.method === 'PUT') {
    const postId = params.id;
    const { content, question, options, map, isPublished } = await request.json();
    try {
      await connectMongo();
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { content, question, options, map, isPublished  },
      );
      return new Response('Updated the post successfully', { status: 200 });
    } catch (error) {
      console.error('Error updating post:', error);
      return new Response('Failed to update the post', { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
};

// DELETE method
export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  if (request.method === 'DELETE') {
    const postId = params.id;
    try {
      await connectMongo();
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return new Response('Post not found', { status: 404 });
      }
      return new Response('The post was deleted successfully', { status: 200 });
    } catch (error) {
      console.error('Error deleting post:', error);
      return new Response('Failed to delete the post', { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
};
