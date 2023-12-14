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

export async function PUT(request: Request, { params }:{params: {id: string}}) {
  const postId = params.id;
  const {content} = await request.json();
  try {
    const post = await Post.findById(postId);
    if(!post) return new Response('cannot find the post', {status: 404});
    post?.updateOne({content});
    await post?.save()
    return new Response('Updated the post successfully', {status: 200})
  } catch (error){
    console.error('Error', error);
    return new Response("Internal server error", {status: 500})

  }
}

export async function DELETE (request: Request, {params}: {params: {id: string}}) {
  const postId = params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
        return new Response('Post not found', { status: 404 });
    }
    await post.deleteOne();
    return new Response('The post was deleted successfully', { status: 204 });
    
  } catch (error) {
    console.error('Error', error);
    return new Response('Internal server error', {status: 500})
  }
}