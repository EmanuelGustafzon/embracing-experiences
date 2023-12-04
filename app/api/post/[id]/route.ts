import connectMongo from '@/utils/Datebase';
import Post from '@/models/Post';

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