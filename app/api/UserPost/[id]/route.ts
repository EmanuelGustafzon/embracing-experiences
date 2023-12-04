import connectMongo from '@/utils/Datebase';
import UserPost from '@/models/UserPost';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const userPostId = params.id 
    try {
        await connectMongo();
        const userPost = await UserPost.findById(userPostId);
        
        if (!userPost) return new Response("Post Not Found", { status: 404 });
        return new Response(JSON.stringify(userPost), { status: 200 });

      } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
      }
  }

  export async function PATCH (request: Request, { params }: { params: { id: string } }) {
    const { title, content, image} = await request.json();

    try {

        let imagePath = '';

        if (image) {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
      
          const path = join(process.cwd(), 'public', 'images', image.name);
          await writeFile(path, buffer);
  
          imagePath = `/images/${image.name}`;
        }

        await connectMongo();

        const userPost = await UserPost.findById(params.id);

        if (!userPost) {
            return new Response("Post not found", { status: 404 });
        }

        userPost.title = title;
        userPost.content = content;
        userPost.image = imagePath;

        await userPost.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

  export async function DELETE (request: Request, { params }: { params: { id: string } }) {
    const userPostId = params.id 
    try {
        await connectMongo();
        await UserPost.findByIdAndRemove(userPostId)
        
        return new Response("Prompt deleted successfully", { status: 200 });

      } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
      }
  }